import { jsx as _jsx } from "react/jsx-runtime";
import { progressBlock } from "./constants.js";
export function ProgressInnerText(props) {
    const { text, offset = 0 } = props;
    if (!text) {
        return null;
    }
    return (_jsx("div", { className: progressBlock('text-inner'), style: { transform: `translateX(calc(var(--g-flow-direction) * ${-offset}%))` }, children: text }));
}
//# sourceMappingURL=ProgressInnerText.js.map
