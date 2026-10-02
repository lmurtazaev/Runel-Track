import { jsx as _jsx } from "react/jsx-runtime";
import { ArrowToggle } from "../../../ArrowToggle/index.js";
import { colorText } from "../../../Text/index.js";
import { block } from "../../../utils/cn.js";
import "./ListItemExpandIcon.css";
const b = block('list-item-expand-icon');
export const ListItemExpandIcon = ({ expanded, behavior = 'action', disabled, }) => {
    return (_jsx(ArrowToggle, { direction: getIconDirection({ behavior, expanded }), className: b(null, colorText({ color: disabled ? 'hint' : undefined })), size: 16 }));
};
function getIconDirection({ behavior, expanded, }) {
    if (expanded && behavior === 'action') {
        return 'top';
    }
    else if (expanded && behavior === 'state') {
        return 'bottom';
    }
    else if (expanded && behavior === 'state-inverse') {
        return 'bottom';
    }
    else if (behavior === 'action') {
        return 'bottom';
    }
    else if (behavior === 'state') {
        return 'right';
    }
    else if (behavior === 'state-inverse') {
        return 'left';
    }
    return 'bottom';
}
//# sourceMappingURL=ListItemExpandIcon.js.map
