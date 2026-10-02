'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useFormResetHandler } from "../../../../hooks/private/index.js";
//FIXME: current implementation is not accessible to screen readers and does not support browser autofill and
// form validation
export function HiddenSelect(props) {
    const { name, value, disabled, form, onReset } = props;
    const ref = useFormResetHandler({ onReset, initialValue: value });
    if (!name || disabled) {
        return null;
    }
    if (value.length === 0) {
        return (_jsx("input", { ref: ref, type: "hidden", name: name, value: value, form: form, disabled: disabled }));
    }
    return (_jsx(React.Fragment, { children: value.map((v, i) => (_jsx("input", { ref: i === 0 ? ref : undefined, value: v, type: "hidden", name: name, form: form, disabled: disabled }, v))) }));
}
//# sourceMappingURL=HiddenSelect.js.map
