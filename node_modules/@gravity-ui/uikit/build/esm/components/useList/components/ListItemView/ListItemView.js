import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { spacing } from "../../../layout/index.js";
import { LIST_ITEM_DATA_ATR, modToHeight } from "../../constants.js";
import { ListItemViewContent, isListItemContentPropsGuard } from "./ListItemViewContent.js";
import { b } from "./styles.js";
export const ListItemView = React.forwardRef(function ListItemView({ id, as: asProps, size = 'm', active, selected, disabled, selectionViewType = 'multiple', activeOnHover: propsActiveOnHover, className, height, dragging, style: propsStyle, content, role = 'option', onClick: _onClick, ...rest }, ref) {
    const Tag = asProps || 'li';
    const onClick = disabled ? undefined : _onClick;
    const activeOnHover = typeof propsActiveOnHover === 'boolean' ? propsActiveOnHover : Boolean(onClick);
    const style = {
        minHeight: `var(--g-list-item-height, ${height ??
            modToHeight[size][Number(Boolean(isListItemContentPropsGuard(content) ? content?.subtitle : false))]}px)`,
        ...propsStyle,
    };
    return (_jsx(Tag, { [LIST_ITEM_DATA_ATR]: id, role: role, "aria-selected": selected, onClick: onClick, className: b({
            active: dragging || active,
            selected: selected && selectionViewType === 'single',
            activeOnHover,
            radius: size,
            size,
            dragging,
            clickable: Boolean(onClick),
        }, spacing({ px: 2 }, className)), style: style, ref: ref, ...rest, children: isListItemContentPropsGuard(content) ? (_jsx(ListItemViewContent, { ...content, hasSelectionIcon: selectionViewType === 'multiple', selected: selected, disabled: disabled })) : (content) }));
});
//# sourceMappingURL=ListItemView.js.map
