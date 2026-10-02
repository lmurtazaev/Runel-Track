"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getButtonView = void 0;
const getButtonView = (theme, isAction = false) => {
    switch (theme) {
        case 'special':
            return isAction ? 'normal-contrast' : 'flat-contrast';
        case 'announcement':
            return isAction ? 'normal-contrast' : 'outlined';
        default:
            return isAction ? 'normal' : 'flat';
    }
};
exports.getButtonView = getButtonView;
//# sourceMappingURL=getButtonView.js.map
