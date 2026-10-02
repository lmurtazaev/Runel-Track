import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProgressInnerText } from "./ProgressInnerText.js";
import { ProgressStackItem } from "./ProgressStackItem.js";
import { progressBlock } from "./constants.js";
import { getOffset, getValueFromStack } from "./utils.js";
export function ProgressWithStack(props) {
    const { stack, stackClassName, value, text } = props;
    const offset = getOffset(value || getValueFromStack(stack));
    return (_jsxs("div", { className: progressBlock('stack', stackClassName), style: { transform: `translateX(calc(var(--g-flow-direction) * ${offset}%))` }, children: [_jsx("div", { className: progressBlock('item'), style: { width: `${-offset}%` } }), stack.map((item, index) => (_jsx(ProgressStackItem, { item: item }, index))), _jsx(ProgressInnerText, { offset: offset, text: text })] }));
}
//# sourceMappingURL=ProgressWithStack.js.map
