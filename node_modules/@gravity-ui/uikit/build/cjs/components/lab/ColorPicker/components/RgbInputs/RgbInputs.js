"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RgbInputs = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const react_color_1 = require("@uiw/react-color");
const Text_1 = require("../../../../Text/index.js");
const controls_1 = require("../../../../controls/index.js");
const constants_1 = require("../../constants.js");
const createChannelInput = ({ label, pin }) => ({
    renderInput: (props, ref) => ((0, jsx_runtime_1.jsx)(controls_1.TextInput, { ...props, 
        /*
         * @uiw/react-color: disable EditableInput styles settings
         */
        style: undefined, ref: ref, defaultValue: props.defaultValue ? String(props.defaultValue) : '', size: 'm', type: 'text', value: String(props.value), onChange: props.onChange, className: (0, constants_1.b)('input'), startContent: (0, jsx_runtime_1.jsx)(Text_1.Text, { className: (0, constants_1.b)('text'), color: "secondary", variant: "caption-1", children: label }), pin: pin })),
    label: undefined,
});
const RgbInputs = ({ hsva, withAlpha, onChange }) => {
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
    return (0, jsx_runtime_1.jsx)(react_color_1.EditableInputRGBA, { hsva: hsva, ...channelProps, onChange: onChange });
};
exports.RgbInputs = RgbInputs;
//# sourceMappingURL=RgbInputs.js.map
