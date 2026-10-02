export const getButtonView = (theme, isAction = false) => {
    switch (theme) {
        case 'special':
            return isAction ? 'normal-contrast' : 'flat-contrast';
        case 'announcement':
            return isAction ? 'normal-contrast' : 'outlined';
        default:
            return isAction ? 'normal' : 'flat';
    }
};
//# sourceMappingURL=getButtonView.js.map
