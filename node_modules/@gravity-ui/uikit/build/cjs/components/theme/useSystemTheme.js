"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSystemTheme = useSystemTheme;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const dom_helpers_1 = require("./dom-helpers.js");
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
function useSystemTheme() {
    const [theme, setTheme] = React.useState((0, dom_helpers_1.getSystemTheme)());
    React.useEffect(() => {
        if (!dom_helpers_1.supportsMatchMedia) {
            return undefined;
        }
        function onChange(event) {
            setTheme(event.matches ? 'dark' : 'light');
        }
        const matcher = (0, dom_helpers_1.getDarkMediaMatch)();
        const unsubscribe = addListener(matcher, onChange);
        return () => unsubscribe();
    }, []);
    return theme;
}
//# sourceMappingURL=useSystemTheme.js.map
