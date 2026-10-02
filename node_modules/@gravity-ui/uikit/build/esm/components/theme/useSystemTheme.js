import * as React from 'react';
import { getDarkMediaMatch, getSystemTheme, supportsMatchMedia } from "./dom-helpers.js";
function addListener(matcher, handler) {
    const isLegacyMethod = typeof matcher.addEventListener !== 'function';
    if (isLegacyMethod) {
        matcher.addListener(handler);
    }
    else {
        matcher.addEventListener('change', handler);
    }
    return () => {
        if (isLegacyMethod) {
            matcher.removeListener(handler);
        }
        else {
            matcher.removeEventListener('change', handler);
        }
    };
}
export function useSystemTheme() {
    const [theme, setTheme] = React.useState(getSystemTheme());
    React.useEffect(() => {
        if (!supportsMatchMedia) {
            return undefined;
        }
        function onChange(event) {
            setTheme(event.matches ? 'dark' : 'light');
        }
        const matcher = getDarkMediaMatch();
        const unsubscribe = addListener(matcher, onChange);
        return () => unsubscribe();
    }, []);
    return theme;
}
//# sourceMappingURL=useSystemTheme.js.map
