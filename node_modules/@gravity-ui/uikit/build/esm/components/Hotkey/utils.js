export const isMac = () => typeof navigator !== 'undefined' ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false;
export function split(val, separator) {
    return val.trim().split(separator).filter(Boolean);
}
//# sourceMappingURL=utils.js.map
