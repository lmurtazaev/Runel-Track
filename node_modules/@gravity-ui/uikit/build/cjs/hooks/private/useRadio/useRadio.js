"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRadio = useRadio;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const __1 = require("../../index.js");
const event_broker_1 = require("../../../components/utils/event-broker/index.js");
const useFormResetHandler_1 = require("../useFormResetHandler/index.js");
function useRadio({ name, value, checked, defaultChecked, disabled, controlRef, controlProps, onUpdate, onChange, onFocus, onBlur, id, }) {
    const controlId = (0, __1.useUniqId)();
    const innerControlRef = React.useRef(null);
    const [isChecked, setCheckedState] = (0, __1.useControlledState)(checked, defaultChecked ?? false, onUpdate);
    const formFieldRef = (0, useFormResetHandler_1.useFormResetHandler)({ initialValue: isChecked, onReset: setCheckedState });
    const handleRef = (0, __1.useForkRef)(controlRef, innerControlRef, formFieldRef);
    const handleChange = (event) => {
        setCheckedState(event.target.checked);
        if (onChange) {
            onChange(event);
        }
    };
    const onChangeCapture = (event) => {
        event_broker_1.eventBroker.publish({
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
