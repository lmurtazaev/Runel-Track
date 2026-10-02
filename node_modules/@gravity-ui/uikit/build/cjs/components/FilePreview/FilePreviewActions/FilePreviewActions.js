"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePreviewActions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const mobile_1 = require("../../mobile/index.js");
const DesktopActionsMenu_1 = require("./DesktopActionsMenu/DesktopActionsMenu.js");
const MobileActionsMenu_1 = require("./MobileActionsMenu/MobileActionsMenu.js");
const FilePreviewActions = ({ actions, fileName, hoverabelPanelClassName, isCustomImage, }) => {
    const mobile = (0, mobile_1.useMobile)();
    if (mobile) {
        return ((0, jsx_runtime_1.jsx)(MobileActionsMenu_1.MobileActionsMenu, { actions: actions, fileName: fileName, isCustomImage: isCustomImage }));
    }
    return ((0, jsx_runtime_1.jsx)(DesktopActionsMenu_1.DesktopActionsMenu, { actions: actions, hoverabelPanelClassName: hoverabelPanelClassName }));
};
exports.FilePreviewActions = FilePreviewActions;
//# sourceMappingURL=FilePreviewActions.js.map
