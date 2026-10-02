"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sameWidthMiddleware = sameWidthMiddleware;
exports.getMiddlewares = getMiddlewares;
const react_1 = require("@floating-ui/react");
const constants_1 = require("../../constants.js");
const adjustBorderWidth = (width) => {
    return width - constants_1.BORDER_WIDTH * 2;
};
const getMinWidth = (referenceWidth, virtualized) => {
    if (virtualized) {
        return referenceWidth > constants_1.POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE
            ? referenceWidth
            : constants_1.POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE;
    }
    return adjustBorderWidth(referenceWidth);
};
const getPopupWidth = (width, controlWidth, virtualized) => {
    let popupWidth = controlWidth;
    if (typeof width === 'number') {
        popupWidth = width;
    }
    else if (width === 'fit') {
        popupWidth = adjustBorderWidth(controlWidth);
    }
    else {
        popupWidth = getMinWidth(controlWidth, virtualized);
    }
    return `${popupWidth}px`;
};
function sameWidthMiddleware(args) {
    const { width, virtualized } = args;
    return (0, react_1.size)({
        apply(state) {
            const skip = typeof width !== 'number' && Boolean(state.elements.floating.style.maxWidth);
            if (skip) {
                return;
            }
            const popupWidth = getPopupWidth(width, state.rects.reference.width, virtualized);
            const floatingStyle = {};
            if (typeof width !== 'number' && width !== 'fit') {
                floatingStyle.minWidth = popupWidth;
                floatingStyle.width = undefined;
            }
            else {
                floatingStyle.minWidth = popupWidth;
                floatingStyle.width = popupWidth;
            }
            floatingStyle.maxWidth = `max(90vw, ${adjustBorderWidth(state.rects.reference.width)}px)`;
            Object.assign(state.elements.floating.style, floatingStyle);
        },
    });
}
function getMiddlewares(args) {
    return [
        (0, react_1.offset)({ mainAxis: constants_1.BORDER_WIDTH, crossAxis: constants_1.BORDER_WIDTH }),
        (0, react_1.flip)({ altBoundary: args.disablePortal }),
        (0, react_1.shift)({
            limiter: (0, react_1.limitShift)(),
            crossAxis: true,
            padding: 10,
            altBoundary: args.disablePortal,
        }),
        sameWidthMiddleware(args),
    ];
}
//# sourceMappingURL=middlewares.js.map
