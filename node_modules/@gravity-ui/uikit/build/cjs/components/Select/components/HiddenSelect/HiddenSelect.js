'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiddenSelect = HiddenSelect;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const private_1 = require("../../../../hooks/private/index.js");
//FIXME: current implementation is not accessible to screen readers and does not support browser autofill and
// form validation
function HiddenSelect(props) {
    const { name, value, disabled, form, onReset } = props;
    const ref = (0, private_1.useFormResetHandler)({ onReset, initialValue: value });
    if (!name || disabled) {
        return null;
    }
    if (value.length === 0) {
        return ((0, jsx_runtime_1.jsx)("input", { ref: ref, type: "hidden", name: name, value: value, form: form, disabled: disabled }));
    }
    return ((0, jsx_runtime_1.jsx)(React.Fragment, { children: value.map((v, i) => ((0, jsx_runtime_1.jsx)("input", { ref: i === 0 ? ref : undefined, value: v, type: "hidden", name: name, form: form, disabled: disabled }, v))) }));
}
//# sourceMappingURL=HiddenSelect.js.map
