import * as React from 'react';
import { useControlledState } from "../useControlledState/useControlledState.js";
export const useOpenState = (props) => {
    const { onOpenChange, onClose } = props;
    const handleOpenChange = React.useCallback((newOpen) => {
        onOpenChange?.(newOpen);
        if (newOpen === false && onClose) {
            onClose();
        }
    }, [onOpenChange, onClose]);
    const [open, setOpenState] = useControlledState(props.open, props.defaultOpen ?? false, handleOpenChange);
    const toggleOpen = React.useCallback((val) => {
        const newOpen = typeof val === 'boolean' ? val : !open;
        setOpenState(newOpen);
    }, [open, setOpenState]);
    return {
        open,
        toggleOpen,
    };
};
//# sourceMappingURL=useOpenState.js.map
