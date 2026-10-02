"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepperItem = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../Button/index.js");
const Icon_1 = require("../Icon/index.js");
const context_1 = require("./context.js");
const utils_1 = require("./utils.js");
exports.StepperItem = React.forwardRef((props, ref) => {
    const { id, children, view = 'idle', disabled = false, className, icon: customIcon, ...restButtonProps } = props;
    const { onUpdate, value, size } = (0, context_1.useStepperContext)();
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
                return icons_1.CircleDashed;
            }
            case 'error': {
                return icons_1.CircleExclamation;
            }
            case 'success': {
                return icons_1.CircleCheck;
            }
            default: {
                return icons_1.CircleDashed;
            }
        }
    }, [view, customIcon]);
    const selectedItem = id === undefined ? false : id === value;
    return ((0, jsx_runtime_1.jsxs)(Button_1.Button, { ref: ref, title: typeof children === 'string' ? children : undefined, ...restButtonProps, width: "auto", className: (0, utils_1.b)('item', { view, disabled, selected: selectedItem, size }, className), onClick: onClick, disabled: disabled, size: size, view: "outlined", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icon, className: (0, utils_1.b)('item-icon', { view }) }), children] }));
});
exports.StepperItem.displayName = 'StepperItem';
//# sourceMappingURL=StepperItem.js.map
