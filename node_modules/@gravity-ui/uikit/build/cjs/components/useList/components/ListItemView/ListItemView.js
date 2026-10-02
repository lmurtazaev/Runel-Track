"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemView = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const layout_1 = require("../../../layout/index.js");
const constants_1 = require("../../constants.js");
const ListItemViewContent_1 = require("./ListItemViewContent.js");
const styles_1 = require("./styles.js");
exports.ListItemView = React.forwardRef(function ListItemView({ id, as: asProps, size = 'm', active, selected, disabled, selectionViewType = 'multiple', activeOnHover: propsActiveOnHover, className, height, dragging, style: propsStyle, content, role = 'option', onClick: _onClick, ...rest }, ref) {
    const Tag = asProps || 'li';
    const onClick = disabled ? undefined : _onClick;
    const activeOnHover = typeof propsActiveOnHover === 'boolean' ? propsActiveOnHover : Boolean(onClick);
    const style = {
        minHeight: `var(--g-list-item-height, ${height ??
            constants_1.modToHeight[size][Number(Boolean((0, ListItemViewContent_1.isListItemContentPropsGuard)(content) ? content?.subtitle : false))]}px)`,
        ...propsStyle,
    };
    return ((0, jsx_runtime_1.jsx)(Tag, { [constants_1.LIST_ITEM_DATA_ATR]: id, role: role, "aria-selected": selected, onClick: onClick, className: (0, styles_1.b)({
            active: dragging || active,
            selected: selected && selectionViewType === 'single',
            activeOnHover,
            radius: size,
            size,
            dragging,
            clickable: Boolean(onClick),
        }, (0, layout_1.spacing)({ px: 2 }, className)), style: style, ref: ref, ...rest, children: (0, ListItemViewContent_1.isListItemContentPropsGuard)(content) ? ((0, jsx_runtime_1.jsx)(ListItemViewContent_1.ListItemViewContent, { ...content, hasSelectionIcon: selectionViewType === 'multiple', selected: selected, disabled: disabled })) : (content) }));
});
//# sourceMappingURL=ListItemView.js.map
