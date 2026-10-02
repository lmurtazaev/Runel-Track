import * as React from 'react';
import { useControlledState, useFocusWithin, useUniqId } from "../../index.js";
import { filterDOMProps } from "../../../components/utils/filterDOMProps.js";
import { useFormResetHandler } from "../useFormResetHandler/index.js";
export function useRadioGroup(props) {
    const { name, value, defaultValue, options = [], disabled, onUpdate, onChange, onFocus, onBlur, } = props;
    const controlId = useUniqId();
    const [currentValue, setValueState] = useControlledState(value, defaultValue ?? null, onUpdate);
    const fieldRef = useFormResetHandler({
        initialValue: currentValue,
        onReset: setValueState,
    });
    const { focusWithinProps } = useFocusWithin({ onFocusWithin: onFocus, onBlurWithin: onBlur });
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
        ...filterDOMProps(props, { labelable: true }),
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
