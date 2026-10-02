"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOpenState = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useControlledState_1 = require("../useControlledState/useControlledState.js");
const useOpenState = (props) => {
    const { onOpenChange, onClose } = props;
    const handleOpenChange = React.useCallback((newOpen) => {
        onOpenChange?.(newOpen);
        if (newOpen === false && onClose) {
            onClose();
        }
    }, [onOpenChange, onClose]);
    const [open, setOpenState] = (0, useControlledState_1.useControlledState)(props.open, props.defaultOpen ?? false, handleOpenChange);
    const toggleOpen = React.useCallback((val) => {
        const newOpen = typeof val === 'boolean' ? val : !open;
        setOpenState(newOpen);
    }, [open, setOpenState]);
    return {
        open,
        toggleOpen,
    };
};
exports.useOpenState = useOpenState;
//# sourceMappingURL=useOpenState.js.map
