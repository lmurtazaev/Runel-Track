import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Check } from '@gravity-ui/icons';
import { focusable } from 'tabbable';
import { useForkRef } from "../../../hooks/index.js";
import { ArrowToggle } from "../../ArrowToggle/index.js";
import { Button } from "../../Button/index.js";
import { Icon } from "../../Icon/index.js";
import { block } from "../../utils/cn.js";
import { filterDOMProps } from "../../utils/filterDOMProps.js";
import "./ListItemView.css";
const b = block('lab-list-item-view');
export const ListItemView = React.forwardRef(ListItemViewComponent);
export function ListItemViewComponent(props, ref) {
    const { size, active, selected, hovered, disabled, onClick, selectionStyle, className, style, collapsed, onCollapseChange, children, isContainer = false, component: Component = 'div', componentProps, collapsible: _collapsible, description, draggable: _draggable, startContent: _startContent, endContent: _endContent, nestedLevel: _nestedLevel, } = props;
    const containerRef = React.useRef(null);
    const componentRef = useForkRef(containerRef, ref);
    return (_jsx(Component, { ref: componentRef, ...componentProps, ...filterDOMProps(props), className: b({
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
                focusable(containerRef.current).some((el) => el.contains(target))) {
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
        }, children: isContainer ? (children) : (_jsx(ListItemViewContent, { ...props, children: children })) }));
}
function ListItemViewContent({ selected, disabled, selectionStyle, draggable, nestedLevel, collapsible, collapsed, onCollapseChange, startContent, children, description, endContent, }) {
    return (_jsxs(React.Fragment, { children: [draggable ? _jsx(Slot, { name: "drag-handle" }) : null, nestedLevel ? _jsx(Slot, { name: "spacer", style: { '--_--nested-level': nestedLevel } }) : null, collapsible ? (_jsx(Slot, { name: "collapsed-toggle", children: _jsx(Button, { className: b('collapsible'), view: "flat", tabIndex: -1, disabled: disabled, onClick: () => {
                        onCollapseChange?.(!collapsed);
                    }, "aria-hidden": "true", children: _jsx(Button.Icon, { children: _jsx(ArrowToggle, { className: b('arrow', { direction: collapsed ? 'bottom' : 'top' }) }) }) }) })) : null, selectionStyle === 'check' && (_jsx(Slot, { name: "checked", children: _jsx("div", { className: b('checked'), children: selected ? _jsx(Icon, { data: Check, className: b('icon') }) : null }) })), startContent ? _jsx(Slot, { name: "start-content", children: startContent }) : null, _jsx(Slot, { name: "content", children: children }), description ? _jsx(Slot, { name: "description", children: description }) : null, endContent ? _jsx(Slot, { name: "end-content", children: endContent }) : null] }));
}
function Slot({ name, children, className, style, }) {
    return (_jsx("div", { className: b('slot', { name }, className), style: style, children: children }));
}
//# sourceMappingURL=ListItemView.js.map
