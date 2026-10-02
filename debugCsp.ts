const DIRECT_ACCESS = 'direct';

const SCRIPT_SRC = 'script-src';
const CONNECT_SRC = 'connect-src';

// The platform allowlist: the manifest carries bare capability names, the
// header carries the same names as quoted source expressions of `script-src`.
export const CSP_CAPABILITIES = ['unsafe-eval', 'wasm-unsafe-eval'] as const;

const ALLOWED_CSP_CAPABILITIES: ReadonlySet<string> = new Set(CSP_CAPABILITIES);

const BASE_POLICY: ReadonlyArray<readonly [string, readonly string[]]> = [
    ['default-src', ["'self'"]],
    [SCRIPT_SRC, ["'self'", "'unsafe-inline'"]],
    ['style-src', ["'self'", "'unsafe-inline'"]],
    ['img-src', ['data:', 'blob:', '*']],
    ['font-src', ["'self'", 'data:', 'https://yastatic.net']],
    ['media-src', ["'self'", 'blob:']],
    [CONNECT_SRC, ["'self'"]],
    ['form-action', ["'self'"]],
    ['frame-src', ["'none'"]],
    ['base-uri', ["'none'"]],
    ['object-src', ["'none'"]],
    ['worker-src', ["'self'", 'blob:']],
    ['manifest-src', ["'none'"]],
];

const SAFE_DOMAIN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;

export type DebugCspSourcesByScope = Readonly<Record<string, readonly string[]>>;

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getExternalPermissions(manifest: unknown): unknown[] {
    if (!isObject(manifest) || !isObject(manifest.permissions)) {
        return [];
    }

    return Array.isArray(manifest.permissions.external) ? manifest.permissions.external : [];
}

function getDirectDomainSources(externalPermissions: unknown[]): string[] {
    const sources: string[] = [];

    for (const entry of externalPermissions) {
        if (!isObject(entry) || typeof entry.domain !== 'string') {
            continue;
        }

        const allowsDirect =
            entry.access === undefined ||
            (Array.isArray(entry.access) && entry.access.includes(DIRECT_ACCESS));

        if (!allowsDirect || !SAFE_DOMAIN.test(entry.domain)) {
            continue;
        }

        sources.push(`https://${entry.domain}`);
    }

    return sources;
}

function getDataPermissions(manifest: unknown): Set<string> {
    if (
        !isObject(manifest) ||
        !isObject(manifest.permissions) ||
        !Array.isArray(manifest.permissions.data)
    ) {
        return new Set();
    }

    return new Set(
        manifest.permissions.data.filter(
            (permission): permission is string =>
                typeof permission === 'string' && permission.length > 0,
        ),
    );
}

function getCspCapabilitySources(manifest: unknown): string[] {
    if (
        !isObject(manifest) ||
        !isObject(manifest.permissions) ||
        !Array.isArray(manifest.permissions.csp)
    ) {
        return [];
    }

    const sources: string[] = [];

    for (const capability of manifest.permissions.csp) {
        if (typeof capability === 'string' && ALLOWED_CSP_CAPABILITIES.has(capability)) {
            sources.push(`'${capability}'`);
        }
    }

    return sources;
}

function getScopeSources(
    permissions: Set<string>,
    sourcesByScope: DebugCspSourcesByScope,
): string[] {
    const sources: string[] = [];

    for (const permission of permissions) {
        sources.push(...(sourcesByScope[permission] ?? []));
    }

    return sources;
}

export function buildDebugContentSecurityPolicy(
    manifest: unknown,
    sourcesByScope: DebugCspSourcesByScope = {},
): string {
    const externalPermissions = getExternalPermissions(manifest);
    const connectSources = new Set([
        ...getDirectDomainSources(externalPermissions),
        ...getScopeSources(getDataPermissions(manifest), sourcesByScope),
    ]);
    const scriptSources = new Set(getCspCapabilitySources(manifest));

    const extraSources: Readonly<Record<string, ReadonlySet<string>>> = {
        [CONNECT_SRC]: connectSources,
        [SCRIPT_SRC]: scriptSources,
    };

    return BASE_POLICY.map(([directive, baseSources]) => {
        const sources = [...baseSources, ...(extraSources[directive] ?? [])];

        return `${directive} ${sources.join(' ')}`;
    }).join('; ');
}
