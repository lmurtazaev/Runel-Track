"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemViewContent = exports.isListItemContentPropsGuard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../../../Icon/index.js");
const Text_1 = require("../../../Text/index.js");
const layout_1 = require("../../../layout/index.js");
const ListItemExpandIcon_1 = require("../ListItemExpandIcon/ListItemExpandIcon.js");
const styles_1 = require("./styles.js");
const isListItemContentPropsGuard = (props) => {
    return typeof props === 'object' && props !== null && 'title' in props;
};
exports.isListItemContentPropsGuard = isListItemContentPropsGuard;
const ListItemViewSlot = ({ children, indentation = 1, className, ...props }) => {
    return ((0, jsx_runtime_1.jsx)(layout_1.Flex, { width: indentation * 16, className: (0, styles_1.b)('slot', className), ...props, children: children }));
};
const renderSafeIndentation = (indentation) => {
    if (indentation && indentation >= 1) {
        return ((0, jsx_runtime_1.jsx)(ListItemViewSlot, { indentation: Math.floor(indentation) }));
    }
    return null;
};
const ListItemViewContent = ({ startSlot, subtitle, endSlot, disabled, hasSelectionIcon, isGroup, indentation, expanded, selected, title, expandIconPlacement = 'start', renderExpandIcon: RenderExpandIcon = ListItemExpandIcon_1.ListItemExpandIcon, }) => {
    const expandIconNode = isGroup ? ((0, jsx_runtime_1.jsx)(RenderExpandIcon, { behavior: expandIconPlacement === 'start' ? 'state' : 'action', expanded: expanded, disabled: disabled })) : null;
    return ((0, jsx_runtime_1.jsxs)(layout_1.Flex, { alignItems: "center", justifyContent: "space-between", gap: "4", className: (0, styles_1.b)('content'), children: [(0, jsx_runtime_1.jsxs)(layout_1.Flex, { gap: "2", alignItems: "center", grow: true, children: [hasSelectionIcon && ((0, jsx_runtime_1.jsx)(ListItemViewSlot // reserve space
                    , { children: selected ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Check, size: 16, className: (0, Text_1.colorText)({ color: 'info' }) })) : null })), renderSafeIndentation(indentation), expandIconPlacement === 'start' && expandIconNode, startSlot, (0, jsx_runtime_1.jsxs)("div", { className: (0, styles_1.b)('main-content'), children: [typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { ellipsis: true, color: disabled ? 'hint' : undefined, variant: isGroup ? 'subheader-1' : undefined, children: title })) : (title), typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { ellipsis: true, color: disabled ? 'hint' : 'secondary', children: subtitle })) : (subtitle)] })] }), (0, jsx_runtime_1.jsxs)(layout_1.Flex, { gap: "2", children: [expandIconPlacement === 'end' && expandIconNode, endSlot] })] }));
};
exports.ListItemViewContent = ListItemViewContent;
//# sourceMappingURL=ListItemViewContent.js.map
