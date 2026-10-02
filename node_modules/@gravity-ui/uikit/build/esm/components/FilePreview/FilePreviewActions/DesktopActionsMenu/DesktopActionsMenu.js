import { jsx as _jsx } from "react/jsx-runtime";
import { useUniqId } from "../../../../hooks/useUniqId/index.js";
import { ActionTooltip } from "../../../ActionTooltip/index.js";
import { Button } from "../../../Button/index.js";
import { block } from "../../../utils/cn.js";
import "./DesktopActionsMenu.css";
const cn = block('file-preview-actions-desktop');
export const DesktopActionsMenu = ({ actions, hoverabelPanelClassName }) => {
    const id = useUniqId();
    return (_jsx("div", { className: cn(null, hoverabelPanelClassName), children: actions.map(({ title, icon, onClick, disabled, tooltipExtraProps, ...props }, index) => {
            const extraProps = props.href
                ? { ...props.extraProps, href: props.href }
                : props.extraProps;
            return (_jsx(ActionTooltip, { title: title, ...tooltipExtraProps, children: _jsx(Button, { onClick: onClick, "aria-describedby": `${id}-${index}`, view: "raised", pin: "circle-circle", disabled: disabled, size: "s", className: cn('action-button'), "aria-label": title, ...extraProps, children: _jsx("div", { className: cn('action-icon-wrapper'), children: icon }) }) }, `${id}-${index}`));
        }) }));
};
//# sourceMappingURL=DesktopActionsMenu.js.map
