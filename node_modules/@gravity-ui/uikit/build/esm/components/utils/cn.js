import { withNaming } from '@bem-react/classname';
export const NAMESPACE = 'g-';
export const cn = withNaming({ e: '__', m: '_' });
export const block = withNaming({ n: NAMESPACE, e: '__', m: '_' });
/**
 * Extracts modifiers part from className
 */
export function modsClassName(className) {
    return className.split(/\s(.*)/)[1];
}
//# sourceMappingURL=cn.js.map
