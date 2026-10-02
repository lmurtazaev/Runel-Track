"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarDisplayText = void 0;
const getAvatarDisplayText = (text, size) => {
    if (size === '3xs') {
        return text[0].toUpperCase();
    }
    const words = text.split(/[^\p{L}]+/u).filter((word) => word.length > 0);
    if (words.length <= 1) {
        return text.slice(0, 2).toUpperCase();
    }
    return [words[0][0], words[1][0]].filter(Boolean).join('').toUpperCase();
};
exports.getAvatarDisplayText = getAvatarDisplayText;
//# sourceMappingURL=utils.js.map
