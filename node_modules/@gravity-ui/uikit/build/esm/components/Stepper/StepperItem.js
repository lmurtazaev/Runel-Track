import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { CircleCheck, CircleDashed, CircleExclamation } from '@gravity-ui/icons';
import { Button } from "../Button/index.js";
import { Icon } from "../Icon/index.js";
import { useStepperContext } from "./context.js";
import { b } from "./utils.js";
export const StepperItem = React.forwardRef((props, ref) => {
    const { id, children, view = 'idle', disabled = false, className, icon: customIcon, ...restButtonProps } = props;
    const { onUpdate, value, size } = useStepperContext();
    const onClick = (e) => {
        props.onClick?.(e);
        onUpdate?.(id);
    };
    const icon = React.useMemo(() => {
        if (customIcon) {
            return customIcon;
        }
        switch (view) {
            case 'idle': {
                return CircleDashed;
            }
            case 'error': {
                return CircleExclamation;
            }
            case 'success': {
                return CircleCheck;
            }
            default: {
                return CircleDashed;
            }
        }
    }, [view, customIcon]);
    const selectedItem = id === undefined ? false : id === value;
    return (_jsxs(Button, { ref: ref, title: typeof children === 'string' ? children : undefined, ...restButtonProps, width: "auto", className: b('item', { view, disabled, selected: selectedItem, size }, className), onClick: onClick, disabled: disabled, size: size, view: "outlined", children: [_jsx(Icon, { data: icon, className: b('item-icon', { view }) }), children] }));
});
StepperItem.displayName = 'StepperItem';
//# sourceMappingURL=StepperItem.js.map
