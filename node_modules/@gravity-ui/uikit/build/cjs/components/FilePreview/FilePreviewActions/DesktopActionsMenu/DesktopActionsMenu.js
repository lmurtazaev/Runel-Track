"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopActionsMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useUniqId_1 = require("../../../../hooks/useUniqId/index.js");
const ActionTooltip_1 = require("../../../ActionTooltip/index.js");
const Button_1 = require("../../../Button/index.js");
const cn_1 = require("../../../utils/cn.js");
require("./DesktopActionsMenu.css");
const cn = (0, cn_1.block)('file-preview-actions-desktop');
const DesktopActionsMenu = ({ actions, hoverabelPanelClassName }) => {
    const id = (0, useUniqId_1.useUniqId)();
    return ((0, jsx_runtime_1.jsx)("div", { className: cn(null, hoverabelPanelClassName), children: actions.map(({ title, icon, onClick, disabled, tooltipExtraProps, ...props }, index) => {
            const extraProps = props.href
                ? { ...props.extraProps, href: props.href }
                : props.extraProps;
            return ((0, jsx_runtime_1.jsx)(ActionTooltip_1.ActionTooltip, { title: title, ...tooltipExtraProps, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { onClick: onClick, "aria-describedby": `${id}-${index}`, view: "raised", pin: "circle-circle", disabled: disabled, size: "s", className: cn('action-button'), "aria-label": title, ...extraProps, children: (0, jsx_runtime_1.jsx)("div", { className: cn('action-icon-wrapper'), children: icon }) }) }, `${id}-${index}`));
        }) }));
};
exports.DesktopActionsMenu = DesktopActionsMenu;
//# sourceMappingURL=DesktopActionsMenu.js.map
