export function isTouchDevice() {
    if (typeof window === 'undefined') {
        return false;
    }
    if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
        return true;
    }
    if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        return true;
    }
    return 'ontouchstart' in window;
}
//# sourceMappingURL=dom.js.map
