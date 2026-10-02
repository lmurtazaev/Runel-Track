import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from "../../../Text/index.js";
import { block } from "../../../utils/cn.js";
import { SelectQa } from "../../constants.js";
import "./SelectCounter.css";
const b = block('select-counter');
export function SelectCounter({ count, size, disabled }) {
    return (_jsx("div", { className: b({ size }), children: _jsx(Text, { variant: size === 'xl' ? 'body-2' : 'body-1', color: disabled ? 'hint' : 'primary', className: b('text'), qa: SelectQa.COUNTER, children: count }) }));
}
//# sourceMappingURL=SelectCounter.js.map
