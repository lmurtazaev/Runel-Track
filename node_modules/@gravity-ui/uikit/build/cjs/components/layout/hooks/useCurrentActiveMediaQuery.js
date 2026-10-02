"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentActiveMediaQuery = exports.makeCurrentActiveMediaExpressions = exports.mockMediaQueryList = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../../hooks/index.js");
exports.mockMediaQueryList = {
    media: '',
    matches: false,
    onchange: () => { },
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: (_) => true,
};
const makeCurrentActiveMediaExpressions = (mediaToValue) => ({
    xs: `(max-width: ${mediaToValue.s - 1}px)`,
    s: `(min-width: ${mediaToValue.s}px) and (max-width: ${mediaToValue.m - 1}px)`,
    m: `(min-width: ${mediaToValue.m}px) and (max-width: ${mediaToValue.l - 1}px)`,
    l: `(min-width: ${mediaToValue.l}px) and (max-width: ${mediaToValue.xl - 1}px)`,
    xl: `(min-width: ${mediaToValue.xl}px) and (max-width: ${mediaToValue.xxl - 1}px)`,
    xxl: `(min-width: ${mediaToValue.xxl}px) and (max-width: ${mediaToValue.xxxl - 1}px)`,
    xxxl: `(min-width: ${mediaToValue.xxxl}px)`,
});
exports.makeCurrentActiveMediaExpressions = makeCurrentActiveMediaExpressions;
const safeMatchMedia = (query) => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return exports.mockMediaQueryList;
    }
    return window.matchMedia(query);
};
class Queries {
    fix;
    queryListsDecl = [];
    constructor(breakpointsMap, fixBreakpoints) {
        const mediaToExpressionMap = (0, exports.makeCurrentActiveMediaExpressions)(breakpointsMap);
        this.fix = fixBreakpoints;
        this.queryListsDecl = [
            // order important here
            ['xs', safeMatchMedia(mediaToExpressionMap.xs)],
            ['s', safeMatchMedia(mediaToExpressionMap.s)],
            ['m', safeMatchMedia(mediaToExpressionMap.m)],
            ['l', safeMatchMedia(mediaToExpressionMap.l)],
            ['xl', safeMatchMedia(mediaToExpressionMap.xl)],
            ['xxl', safeMatchMedia(mediaToExpressionMap.xxl)],
            ['xxxl', safeMatchMedia(mediaToExpressionMap.xxxl)],
        ];
    }
    getCurrentActiveMedia() {
        const activeMedia = this.queryListsDecl.find(([_, queryList]) => queryList.matches)?.[0];
        if (!activeMedia) {
            return this.fix ? 'xs' : 's';
        }
        else if (activeMedia === 'xs' && !this.fix) {
            return 's';
        }
        return activeMedia;
    }
    addListeners(fn) {
        this.queryListsDecl.forEach(([_, queryList]) => queryList.addEventListener('change', fn));
    }
    removeListeners(fn) {
        this.queryListsDecl.forEach(([_, queryList]) => queryList.removeEventListener('change', fn));
    }
}
/**
 * @private
 */
const useCurrentActiveMediaQuery = (breakpointsMap, fixBreakpoints, initialMediaQuery) => {
    const [state, _setState] = React.useState(initialMediaQuery ?? (fixBreakpoints ? 'xs' : 's'));
    (0, hooks_1.useLayoutEffect)(() => {
        const queries = new Queries(breakpointsMap, fixBreakpoints);
        const setState = () => {
            _setState(queries.getCurrentActiveMedia());
        };
        queries.addListeners(setState);
        setState();
        return () => {
            queries.removeListeners(setState);
        };
    }, [breakpointsMap, fixBreakpoints]);
    return state;
};
exports.useCurrentActiveMediaQuery = useCurrentActiveMediaQuery;
//# sourceMappingURL=useCurrentActiveMediaQuery.js.map
