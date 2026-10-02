import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { EditableInputRGBA } from '@uiw/react-color';
import { Text } from "../../../../Text/index.js";
import { TextInput } from "../../../../controls/index.js";
import { b } from "../../constants.js";
const createChannelInput = ({ label, pin }) => ({
    renderInput: (props, ref) => (_jsx(TextInput, { ...props, 
        /*
         * @uiw/react-color: disable EditableInput styles settings
         */
        style: undefined, ref: ref, defaultValue: props.defaultValue ? String(props.defaultValue) : '', size: 'm', type: 'text', value: String(props.value), onChange: props.onChange, className: b('input'), startContent: _jsx(Text, { className: b('text'), color: "secondary", variant: "caption-1", children: label }), pin: pin })),
    label: undefined,
});
export const RgbInputs = ({ hsva, withAlpha, onChange }) => {
    const channelProps = React.useMemo(() => ({
        rProps: createChannelInput({ label: 'R', pin: 'round-brick' }),
        gProps: createChannelInput({ label: 'G', pin: 'clear-clear' }),
        bProps: createChannelInput({
            label: 'B',
            pin: withAlpha ? 'brick-brick' : 'brick-round',
        }),
        aProps: withAlpha
            ? createChannelInput({ label: 'A', pin: 'clear-round' })
            : false,
    }), [withAlpha]);
    return _jsx(EditableInputRGBA, { hsva: hsva, ...channelProps, onChange: onChange });
};
//# sourceMappingURL=RgbInputs.js.map
