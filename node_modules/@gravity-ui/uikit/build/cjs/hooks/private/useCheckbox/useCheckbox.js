"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckbox = useCheckbox;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const __1 = require("../../index.js");
const event_broker_1 = require("../../../components/utils/event-broker/index.js");
const useFormResetHandler_1 = require("../useFormResetHandler/index.js");
function useCheckbox({ name, value, id, defaultChecked, checked, indeterminate, onUpdate, onChange, controlRef, controlProps, onFocus, onBlur, disabled, }) {
    const innerControlRef = React.useRef(null);
    const [isChecked, setCheckedState] = (0, __1.useControlledState)(checked, defaultChecked ?? false, onUpdate);
    const inputChecked = indeterminate ? false : checked;
    const fieldRef = (0, useFormResetHandler_1.useFormResetHandler)({ initialValue: isChecked, onReset: setCheckedState });
    const handleRef = (0, __1.useForkRef)(controlRef, innerControlRef, fieldRef);
    (0, __1.useLayoutEffect)(() => {
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
        event_broker_1.eventBroker.publish({
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
