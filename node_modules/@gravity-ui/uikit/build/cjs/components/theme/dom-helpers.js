"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDarkMediaMatch = exports.supportsMatchMedia = void 0;
exports.updateBodyClassName = updateBodyClassName;
exports.updateBodyDirection = updateBodyDirection;
exports.getSystemTheme = getSystemTheme;
const cn_1 = require("../utils/cn.js");
const constants_1 = require("./constants.js");
const b = (0, cn_1.block)(constants_1.ROOT_CLASSNAME);
const rootClassName = b();
function updateBodyClassName({ theme, className, prevClassName, }) {
    const bodyEl = document.body;
    // https://html.spec.whatwg.org/multipage/dom.html#dom-document-body-dev
    if (!bodyEl) {
        return;
    }
    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }
    if (prevClassName) {
        const parsedPrevCustomRootClassNames = prevClassName.split(' ');
        parsedPrevCustomRootClassNames.forEach((cls) => {
            if (cls) {
                bodyEl.classList.remove(cls);
            }
        });
    }
    if (className) {
        const parsedCustomRootClassNames = className.split(' ');
        parsedCustomRootClassNames.forEach((cls) => {
            if (cls && !bodyEl.classList.contains(cls)) {
                bodyEl.classList.add(cls);
            }
        });
    }
    [...bodyEl.classList].forEach((cls) => {
        if (cls.startsWith((0, cn_1.modsClassName)(b({ theme: true })))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add((0, cn_1.modsClassName)(b({ theme })));
}
function updateBodyDirection(direction) {
    const bodyEl = document.body;
    // https://html.spec.whatwg.org/multipage/dom.html#dom-document-body-dev
    if (!bodyEl) {
        return;
    }
    if (direction === constants_1.DEFAULT_DIRECTION) {
        bodyEl.removeAttribute('dir');
    }
    else {
        bodyEl.setAttribute('dir', direction);
    }
}
exports.supportsMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
const getDarkMediaMatch = () => window.matchMedia('(prefers-color-scheme: dark)');
exports.getDarkMediaMatch = getDarkMediaMatch;
function getSystemTheme() {
    if (exports.supportsMatchMedia) {
        return (0, exports.getDarkMediaMatch)().matches ? 'dark' : 'light';
    }
    else {
        return 'light';
    }
}
//# sourceMappingURL=dom-helpers.js.map
