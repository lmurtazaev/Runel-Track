import * as React from 'react';
import { useControlledState } from "../useControlledState/index.js";
import { useOpenState } from "./useOpenState.js";
export const useSelect = ({ defaultOpen, onClose, onOpenChange, open, value: valueProps, defaultValue = [], multiple, onUpdate, disabled, }) => {
    const [value, setValueInner] = useControlledState(valueProps, defaultValue, onUpdate);
    const [activeIndex, setActiveIndex] = React.useState();
    const { toggleOpen, ...openState } = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open,
    });
    const setValue = React.useCallback((v) => {
        if (!disabled) {
            setValueInner(v);
        }
    }, [setValueInner, disabled]);
    const handleSingleSelection = React.useCallback((option) => {
        if (!value.includes(option.value)) {
            const nextValue = [option.value];
            setValue(nextValue);
        }
        toggleOpen(false);
    }, [value, setValue, toggleOpen]);
    const handleMultipleSelection = React.useCallback((option) => {
        const alreadySelected = value.includes(option.value);
        const nextValue = alreadySelected
            ? value.filter((iteratedVal) => iteratedVal !== option.value)
            : [...value, option.value];
        setValue(nextValue);
    }, [value, setValue]);
    const handleSelection = React.useCallback((option) => {
        if (multiple) {
            handleMultipleSelection(option);
        }
        else {
            handleSingleSelection(option);
        }
    }, [multiple, handleSingleSelection, handleMultipleSelection]);
    const handleClearValue = React.useCallback(() => {
        setValue([]);
    }, [setValue]);
    return {
        value,
        activeIndex,
        setValue,
        handleSelection,
        handleClearValue,
        toggleOpen,
        setActiveIndex,
        ...openState,
    };
};
//# sourceMappingURL=useSelect.js.map
