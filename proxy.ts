import type { IncomingMessage, ServerResponse } from 'http';
import http from 'http';
import https from 'https';

import type { Plugin } from 'vite' with { 'resolution-mode': 'import' };

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export function proxyPlugin(): Plugin {
    return {
        name: 'dev-proxy',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use(
                (req: IncomingMessage, res: ServerResponse, next: () => void) => {
                    if (req.url === '/proxy' && req.method === 'OPTIONS') {
                        res.writeHead(204, CORS_HEADERS);
                        res.end();
                        return;
                    }

                    if (req.url === '/proxy' && req.method === 'POST') {
                        let rawBody = '';
                        req.on('data', (chunk: Buffer) => {
                            rawBody += chunk.toString();
                        });
                        req.on('end', () => {
                            let parsed: {
                                url: string;
                                method?: string;
                                headers?: Record<string, string>;
                                body?: string;
                            };
                            try {
                                parsed = JSON.parse(rawBody);
                            } catch {
                                res.writeHead(400, CORS_HEADERS);
                                res.end(JSON.stringify({ error: 'Invalid JSON body' }));
                                return;
                            }

                            const { url, method = 'GET', headers = {}, body } = parsed;

                            if (!url) {
                                res.writeHead(400, CORS_HEADERS);
                                res.end(JSON.stringify({ error: 'Missing "url" field' }));
                                return;
                            }

                            let targetUrl: URL;
                            try {
                                targetUrl = new URL(url);
                            } catch {
                                res.writeHead(400, CORS_HEADERS);
                                res.end(JSON.stringify({ error: 'Invalid URL' }));
                                return;
                            }

                            const isHttps = targetUrl.protocol === 'https:';
                            const transport = isHttps ? https : http;
                            const bodyBuffer = body ? Buffer.from(body) : undefined;

                            const options: http.RequestOptions = {
                                hostname: targetUrl.hostname,
                                port: targetUrl.port || (isHttps ? 443 : 80),
                                path: targetUrl.pathname + targetUrl.search,
                                method: method.toUpperCase(),
                                headers: {
                                    ...headers,
                                    ...(bodyBuffer
                                        ? { 'Content-Length': String(bodyBuffer.length) }
                                        : {}),
                                },
                            };

                            const proxyReq = transport.request(options, (proxyRes) => {
                                const responseHeaders: Record<string, string | string[]> = {
                                    ...CORS_HEADERS,
                                };
                                for (const [key, value] of Object.entries(proxyRes.headers)) {
                                    // The dev server owns CORS, not the upstream API.
                                    if (
                                        value !== undefined &&
                                        !key.toLowerCase().startsWith('access-control-allow-')
                                    ) {
                                        responseHeaders[key] = value;
                                    }
                                }
                                res.writeHead(proxyRes.statusCode ?? 200, responseHeaders);
                                proxyRes.pipe(res);
                            });

                            proxyReq.on('error', (err: Error) => {
                                res.writeHead(502, CORS_HEADERS);
                                res.end(JSON.stringify({ error: err.message }));
                            });

                            if (bodyBuffer) {
                                proxyReq.write(bodyBuffer);
                            }
                            proxyReq.end();
                        });
                        return;
                    }

                    next();
                },
            );
        },
    };
}
