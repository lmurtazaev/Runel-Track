import * as React from 'react';
import { useControlledState, useForkRef, useUniqId } from "../../index.js";
import { eventBroker } from "../../../components/utils/event-broker/index.js";
import { useFormResetHandler } from "../useFormResetHandler/index.js";
export function useRadio({ name, value, checked, defaultChecked, disabled, controlRef, controlProps, onUpdate, onChange, onFocus, onBlur, id, }) {
    const controlId = useUniqId();
    const innerControlRef = React.useRef(null);
    const [isChecked, setCheckedState] = useControlledState(checked, defaultChecked ?? false, onUpdate);
    const formFieldRef = useFormResetHandler({ initialValue: isChecked, onReset: setCheckedState });
    const handleRef = useForkRef(controlRef, innerControlRef, formFieldRef);
    const handleChange = (event) => {
        setCheckedState(event.target.checked);
        if (onChange) {
            onChange(event);
        }
    };
    const onChangeCapture = (event) => {
        eventBroker.publish({
            componentId: 'Radio',
            eventId: 'click',
            domEvent: event,
        });
    };
    const inputProps = {
        ...controlProps,
        name: name || controlId,
        value,
        id,
        onFocus,
        onBlur,
        disabled,
        type: 'radio',
        onChange: handleChange,
        onChangeCapture: onChangeCapture,
        checked,
        defaultChecked: defaultChecked,
        ref: handleRef,
    };
    return { checked: isChecked, inputProps };
}
//# sourceMappingURL=useRadio.js.map
