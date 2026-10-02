import * as React from 'react';
import { useControlledState, useForkRef, useLayoutEffect } from "../../index.js";
import { eventBroker } from "../../../components/utils/event-broker/index.js";
import { useFormResetHandler } from "../useFormResetHandler/index.js";
export function useCheckbox({ name, value, id, defaultChecked, checked, indeterminate, onUpdate, onChange, controlRef, controlProps, onFocus, onBlur, disabled, }) {
    const innerControlRef = React.useRef(null);
    const [isChecked, setCheckedState] = useControlledState(checked, defaultChecked ?? false, onUpdate);
    const inputChecked = indeterminate ? false : checked;
    const fieldRef = useFormResetHandler({ initialValue: isChecked, onReset: setCheckedState });
    const handleRef = useForkRef(controlRef, innerControlRef, fieldRef);
    useLayoutEffect(() => {
        if (innerControlRef.current) {
            innerControlRef.current.indeterminate = Boolean(indeterminate);
        }
    }, [indeterminate]);
    const handleChange = (event) => {
        setCheckedState(event.target.checked);
        if (onChange) {
            onChange(event);
        }
    };
    const handleClickCapture = React.useCallback((event) => {
        eventBroker.publish({
            componentId: 'Checkbox',
            eventId: 'click',
            domEvent: event,
            meta: {
                checked: event.target.checked,
            },
        });
    }, []);
    const inputProps = {
        ...controlProps,
        name,
        value,
        id,
        onFocus,
        onBlur,
        disabled,
        type: 'checkbox',
        onChange: handleChange,
        onClickCapture: handleClickCapture,
        defaultChecked: defaultChecked,
        checked: inputChecked,
        ref: handleRef,
    };
    return { checked: isChecked, inputProps };
}
//# sourceMappingURL=useCheckbox.js.map
