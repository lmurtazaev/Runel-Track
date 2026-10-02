'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItem = exports.defaultRenderItem = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../../Icon/index.js");
const cn_1 = require("../../utils/cn.js");
const event_broker_1 = require("../../utils/event-broker/index.js");
const constants_1 = require("../constants.js");
const utils_1 = require("../utils.js");
const b = (0, cn_1.block)('list');
const ROLES_WITH_ARIA_SELECTED = new Set(['option', 'gridcell', 'row', 'tab']);
const defaultRenderItem = (item) => String(item);
exports.defaultRenderItem = defaultRenderItem;
function getStyle(provided, style) {
    if (!style) {
        return provided?.draggableProps.style;
    }
    return {
        ...provided?.draggableProps.style,
        ...style,
    };
}
class ListItem extends React.Component {
    static publishEvent = event_broker_1.eventBroker.withEventPublisher('List');
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
        (0, jsx_runtime_1.jsxs)("div", { role: role, "aria-selected": ROLES_WITH_ARIA_SELECTED.has(role) ? selected : undefined, "aria-disabled": item.disabled, "data-qa": active ? constants_1.ListQa.ACTIVE_ITEM : undefined, className: b('item', {
                sortable,
                active,
                selected,
                inactive: item.disabled,
                'sort-handle-align': sortHandleAlign,
                dragging: isDragging,
            }, itemClassName), ...this.props.provided?.draggableProps, style: getStyle(this.props.provided, fixedStyle), onClick: item.disabled ? undefined : this.onClick, onClickCapture: item.disabled ? undefined : this.onClickCapture, onMouseEnter: this.onMouseEnter, ref: this.setRef, id: (0, utils_1.getElementId)(this.props.listId, this.props.itemIndex), children: [this.renderSortIcon(), this.renderContent()] }));
    }
    getNode = () => this.node;
    setRef = (node) => {
        this.node = node;
        this.props.provided?.innerRef(node);
    };
    renderSortIcon() {
        const { sortable } = this.props;
        return sortable ? ((0, jsx_runtime_1.jsx)("div", { ...this.props.provided?.dragHandleProps, className: b('item-sort-icon'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Grip, size: 12 }) })) : null;
    }
    renderContent() {
        const { renderItem = exports.defaultRenderItem, item, active, itemIndex } = this.props;
        return (0, jsx_runtime_1.jsx)("div", { className: b('item-content'), children: renderItem(item, active, itemIndex) });
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
exports.ListItem = ListItem;
//# sourceMappingURL=ListItem.js.map
