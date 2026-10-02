import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../Button/index.js";
import { cnPopover } from "../../Popover.classname.js";
import { getButtonView } from "./helpers/getButtonView.js";
export const Buttons = ({ theme, tooltipActionButton, tooltipCancelButton }) => {
    if (!tooltipActionButton && !tooltipCancelButton) {
        return null;
    }
    return (_jsxs("div", { className: cnPopover('tooltip-buttons'), children: [tooltipActionButton && (_jsx(Button, { view: getButtonView(theme, true), width: "max", onClick: tooltipActionButton.onClick, className: cnPopover('tooltip-button'), children: tooltipActionButton.text })), tooltipCancelButton && (_jsx(Button, { view: getButtonView(theme, false), width: "max", onClick: tooltipCancelButton.onClick, className: cnPopover('tooltip-button'), children: tooltipCancelButton.text }))] }));
};
//# sourceMappingURL=Buttons.js.map
