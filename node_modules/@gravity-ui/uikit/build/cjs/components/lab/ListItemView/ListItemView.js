"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemView = void 0;
exports.ListItemViewComponent = ListItemViewComponent;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const tabbable_1 = require("tabbable");
const hooks_1 = require("../../../hooks/index.js");
const ArrowToggle_1 = require("../../ArrowToggle/index.js");
const Button_1 = require("../../Button/index.js");
const Icon_1 = require("../../Icon/index.js");
const cn_1 = require("../../utils/cn.js");
const filterDOMProps_1 = require("../../utils/filterDOMProps.js");
require("./ListItemView.css");
const b = (0, cn_1.block)('lab-list-item-view');
exports.ListItemView = React.forwardRef(ListItemViewComponent);
function ListItemViewComponent(props, ref) {
    const { size, active, selected, hovered, disabled, onClick, selectionStyle, className, style, collapsed, onCollapseChange, children, isContainer = false, component: Component = 'div', componentProps, collapsible: _collapsible, description, draggable: _draggable, startContent: _startContent, endContent: _endContent, nestedLevel: _nestedLevel, } = props;
    const containerRef = React.useRef(null);
    const componentRef = (0, hooks_1.useForkRef)(containerRef, ref);
    return ((0, jsx_runtime_1.jsx)(Component, { ref: componentRef, ...componentProps, ...(0, filterDOMProps_1.filterDOMProps)(props), className: b({
            size,
            selected: selected && selectionStyle === 'highlight',
            disabled,
            active,
            hovered: typeof hovered === 'boolean' && (hovered ? 'yes' : 'no'),
            'is-container': isContainer,
            'has-description': Boolean(description),
        }, componentProps?.className ?? className), style: componentProps?.style ?? style, onClick: (e) => {
            if (disabled) {
                e.preventDefault();
                return;
            }
            const target = e.target;
            if (target instanceof Element &&
                containerRef.current &&
                (0, tabbable_1.focusable)(containerRef.current).some((el) => el.contains(target))) {
                return;
            }
            if (typeof onClick === 'function' ||
                typeof componentProps?.onClick === 'function') {
                onClick?.(e);
                componentProps?.onClick?.(e);
            }
            else if (typeof onCollapseChange === 'function') {
                onCollapseChange(!collapsed);
            }
        }, children: isContainer ? (children) : ((0, jsx_runtime_1.jsx)(ListItemViewContent, { ...props, children: children })) }));
}
function ListItemViewContent({ selected, disabled, selectionStyle, draggable, nestedLevel, collapsible, collapsed, onCollapseChange, startContent, children, description, endContent, }) {
    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [draggable ? (0, jsx_runtime_1.jsx)(Slot, { name: "drag-handle" }) : null, nestedLevel ? (0, jsx_runtime_1.jsx)(Slot, { name: "spacer", style: { '--_--nested-level': nestedLevel } }) : null, collapsible ? ((0, jsx_runtime_1.jsx)(Slot, { name: "collapsed-toggle", children: (0, jsx_runtime_1.jsx)(Button_1.Button, { className: b('collapsible'), view: "flat", tabIndex: -1, disabled: disabled, onClick: () => {
                        onCollapseChange?.(!collapsed);
                    }, "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(Button_1.Button.Icon, { children: (0, jsx_runtime_1.jsx)(ArrowToggle_1.ArrowToggle, { className: b('arrow', { direction: collapsed ? 'bottom' : 'top' }) }) }) }) })) : null, selectionStyle === 'check' && ((0, jsx_runtime_1.jsx)(Slot, { name: "checked", children: (0, jsx_runtime_1.jsx)("div", { className: b('checked'), children: selected ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Check, className: b('icon') }) : null }) })), startContent ? (0, jsx_runtime_1.jsx)(Slot, { name: "start-content", children: startContent }) : null, (0, jsx_runtime_1.jsx)(Slot, { name: "content", children: children }), description ? (0, jsx_runtime_1.jsx)(Slot, { name: "description", children: description }) : null, endContent ? (0, jsx_runtime_1.jsx)(Slot, { name: "end-content", children: endContent }) : null] }));
}
function Slot({ name, children, className, style, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: b('slot', { name }, className), style: style, children: children }));
}
//# sourceMappingURL=ListItemView.js.map
