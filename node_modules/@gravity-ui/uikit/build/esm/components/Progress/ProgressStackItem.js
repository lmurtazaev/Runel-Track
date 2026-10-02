import { jsx as _jsx } from "react/jsx-runtime";
import { progressBlock } from "./constants.js";
export function ProgressStackItem({ item }) {
    const { value, color, className, theme, title, content, loading } = item;
    const modifiers = {
        loading,
    };
    if (typeof color === 'undefined') {
        modifiers.theme = theme || 'default';
    }
    if (Number.isFinite(value)) {
        return (_jsx("div", { className: progressBlock('item', modifiers, className), style: { width: `${value}%`, backgroundColor: color }, title: title, children: content }));
    }
    return null;
}
//# sourceMappingURL=ProgressStackItem.js.map
