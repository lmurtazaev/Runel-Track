"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRadioGroup = useRadioGroup;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const __1 = require("../../index.js");
const filterDOMProps_1 = require("../../../components/utils/filterDOMProps.js");
const useFormResetHandler_1 = require("../useFormResetHandler/index.js");
function useRadioGroup(props) {
    const { name, value, defaultValue, options = [], disabled, onUpdate, onChange, onFocus, onBlur, } = props;
    const controlId = (0, __1.useUniqId)();
    const [currentValue, setValueState] = (0, __1.useControlledState)(value, defaultValue ?? null, onUpdate);
    const fieldRef = (0, useFormResetHandler_1.useFormResetHandler)({
        initialValue: currentValue,
        onReset: setValueState,
    });
    const { focusWithinProps } = (0, __1.useFocusWithin)({ onFocusWithin: onFocus, onBlurWithin: onBlur });
    const handleChange = React.useCallback((event) => {
        setValueState(event.target.value);
        if (onChange) {
            onChange(event);
        }
    }, [onChange, setValueState]);
    const contextProps = React.useMemo(() => ({
        name: name || controlId,
        currentValue,
        disabled: Boolean(disabled),
        ref: fieldRef,
        onChange: handleChange,
    }), [controlId, currentValue, disabled, fieldRef, handleChange, name]);
    const containerProps = {
        ...(0, filterDOMProps_1.filterDOMProps)(props, { labelable: true }),
        ...focusWithinProps,
        role: 'radiogroup',
        'aria-disabled': disabled,
    };
    const optionsProps = options.map((option) => ({
        name: name || controlId,
        value: option.value,
        content: option.content,
        title: option.title,
        checked: currentValue === String(option.value),
        disabled: disabled || option.disabled,
        onChange: handleChange,
        ref: fieldRef,
    }));
    return { containerProps, optionsProps, contextProps };
}
//# sourceMappingURL=useRadioGroup.js.map
