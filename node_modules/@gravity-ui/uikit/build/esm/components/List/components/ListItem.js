'use client';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Grip } from '@gravity-ui/icons';
import { Icon } from "../../Icon/index.js";
import { block } from "../../utils/cn.js";
import { eventBroker } from "../../utils/event-broker/index.js";
import { ListQa } from "../constants.js";
import { getElementId } from "../utils.js";
const b = block('list');
const ROLES_WITH_ARIA_SELECTED = new Set(['option', 'gridcell', 'row', 'tab']);
export const defaultRenderItem = (item) => String(item);
function getStyle(provided, style) {
    if (!style) {
        return provided?.draggableProps.style;
    }
    return {
        ...provided?.draggableProps.style,
        ...style,
    };
}
export class ListItem extends React.Component {
    static publishEvent = eventBroker.withEventPublisher('List');
    node = null;
    render() {
        const { item, height, style, sortable, sortHandleAlign, itemClassName, selected, active, role = 'listitem', isDragging = false, } = this.props;
        /*
        This fixes item drag layout for rtl direction.
        react-window has a bug where in rtl it setting "right" to 0 instead of undefined.
         */
        const fixedStyle = {
            height,
            ...style,
            right: undefined,
        };
        return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        _jsxs("div", { role: role, "aria-selected": ROLES_WITH_ARIA_SELECTED.has(role) ? selected : undefined, "aria-disabled": item.disabled, "data-qa": active ? ListQa.ACTIVE_ITEM : undefined, className: b('item', {
                sortable,
                active,
                selected,
                inactive: item.disabled,
                'sort-handle-align': sortHandleAlign,
                dragging: isDragging,
            }, itemClassName), ...this.props.provided?.draggableProps, style: getStyle(this.props.provided, fixedStyle), onClick: item.disabled ? undefined : this.onClick, onClickCapture: item.disabled ? undefined : this.onClickCapture, onMouseEnter: this.onMouseEnter, ref: this.setRef, id: getElementId(this.props.listId, this.props.itemIndex), children: [this.renderSortIcon(), this.renderContent()] }));
    }
    getNode = () => this.node;
    setRef = (node) => {
        this.node = node;
        this.props.provided?.innerRef(node);
    };
    renderSortIcon() {
        const { sortable } = this.props;
        return sortable ? (_jsx("div", { ...this.props.provided?.dragHandleProps, className: b('item-sort-icon'), children: _jsx(Icon, { data: Grip, size: 12 }) })) : null;
    }
    renderContent() {
        const { renderItem = defaultRenderItem, item, active, itemIndex } = this.props;
        return _jsx("div", { className: b('item-content'), children: renderItem(item, active, itemIndex) });
    }
    onClick = (event) => {
        if (!this.props.onClick) {
            return;
        }
        this.props.onClick(this.props.item, this.props.itemIndex, false, event);
    };
    onClickCapture = (event) => {
        ListItem.publishEvent({
            domEvent: event,
            eventId: 'click',
        });
    };
    onMouseEnter = () => !this.props.item.disabled && this.props.onActivate(this.props.itemIndex);
}
//# sourceMappingURL=ListItem.js.map
