import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { EditableInput } from '@uiw/react-color';
import { TextInput } from "../../../../controls/index.js";
import { b } from "../../constants.js";
export const HexInput = ({ value, withAlpha, onChange, onBlur }) => {
    const handleInputChange = React.useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);
    const renderInput = (props, ref) => (_jsx(TextInput, { ...props, 
        /*
         * @uiw/react-color: disable EditableInput styles settings
         */
        style: undefined, ref: ref, defaultValue: props.defaultValue ? String(props.defaultValue) : '', size: 'm', type: 'text', value: String(props.value), onChange: props.onChange, onBlur: props.onBlur }));
    return (_jsx(EditableInput, { value: value, onChange: handleInputChange, onBlur: onBlur, className: b('hex-input', { withAlpha }), renderInput: renderInput }));
};
//# sourceMappingURL=HexInput.js.map
