"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buttons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("../../../../Button/index.js");
const Popover_classname_1 = require("../../Popover.classname.js");
const getButtonView_1 = require("./helpers/getButtonView.js");
const Buttons = ({ theme, tooltipActionButton, tooltipCancelButton }) => {
    if (!tooltipActionButton && !tooltipCancelButton) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-buttons'), children: [tooltipActionButton && ((0, jsx_runtime_1.jsx)(Button_1.Button, { view: (0, getButtonView_1.getButtonView)(theme, true), width: "max", onClick: tooltipActionButton.onClick, className: (0, Popover_classname_1.cnPopover)('tooltip-button'), children: tooltipActionButton.text })), tooltipCancelButton && ((0, jsx_runtime_1.jsx)(Button_1.Button, { view: (0, getButtonView_1.getButtonView)(theme, false), width: "max", onClick: tooltipCancelButton.onClick, className: (0, Popover_classname_1.cnPopover)('tooltip-button'), children: tooltipCancelButton.text }))] }));
};
exports.Buttons = Buttons;
//# sourceMappingURL=Buttons.js.map
