import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from '@gravity-ui/icons';
import { Icon } from "../../../Icon/index.js";
import { Text, colorText } from "../../../Text/index.js";
import { Flex } from "../../../layout/index.js";
import { ListItemExpandIcon } from "../ListItemExpandIcon/ListItemExpandIcon.js";
import { b } from "./styles.js";
export const isListItemContentPropsGuard = (props) => {
    return typeof props === 'object' && props !== null && 'title' in props;
};
const ListItemViewSlot = ({ children, indentation = 1, className, ...props }) => {
    return (_jsx(Flex, { width: indentation * 16, className: b('slot', className), ...props, children: children }));
};
const renderSafeIndentation = (indentation) => {
    if (indentation && indentation >= 1) {
        return (_jsx(ListItemViewSlot, { indentation: Math.floor(indentation) }));
    }
    return null;
};
export const ListItemViewContent = ({ startSlot, subtitle, endSlot, disabled, hasSelectionIcon, isGroup, indentation, expanded, selected, title, expandIconPlacement = 'start', renderExpandIcon: RenderExpandIcon = ListItemExpandIcon, }) => {
    const expandIconNode = isGroup ? (_jsx(RenderExpandIcon, { behavior: expandIconPlacement === 'start' ? 'state' : 'action', expanded: expanded, disabled: disabled })) : null;
    return (_jsxs(Flex, { alignItems: "center", justifyContent: "space-between", gap: "4", className: b('content'), children: [_jsxs(Flex, { gap: "2", alignItems: "center", grow: true, children: [hasSelectionIcon && (_jsx(ListItemViewSlot // reserve space
                    , { children: selected ? (_jsx(Icon, { data: Check, size: 16, className: colorText({ color: 'info' }) })) : null })), renderSafeIndentation(indentation), expandIconPlacement === 'start' && expandIconNode, startSlot, _jsxs("div", { className: b('main-content'), children: [typeof title === 'string' ? (_jsx(Text, { ellipsis: true, color: disabled ? 'hint' : undefined, variant: isGroup ? 'subheader-1' : undefined, children: title })) : (title), typeof subtitle === 'string' ? (_jsx(Text, { ellipsis: true, color: disabled ? 'hint' : 'secondary', children: subtitle })) : (subtitle)] })] }), _jsxs(Flex, { gap: "2", children: [expandIconPlacement === 'end' && expandIconNode, endSlot] })] }));
};
//# sourceMappingURL=ListItemViewContent.js.map
