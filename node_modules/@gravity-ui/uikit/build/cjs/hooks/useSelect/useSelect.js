"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelect = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useControlledState_1 = require("../useControlledState/index.js");
const useOpenState_1 = require("./useOpenState.js");
const useSelect = ({ defaultOpen, onClose, onOpenChange, open, value: valueProps, defaultValue = [], multiple, onUpdate, disabled, }) => {
    const [value, setValueInner] = (0, useControlledState_1.useControlledState)(valueProps, defaultValue, onUpdate);
    const [activeIndex, setActiveIndex] = React.useState();
    const { toggleOpen, ...openState } = (0, useOpenState_1.useOpenState)({
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
exports.useSelect = useSelect;
//# sourceMappingURL=useSelect.js.map
