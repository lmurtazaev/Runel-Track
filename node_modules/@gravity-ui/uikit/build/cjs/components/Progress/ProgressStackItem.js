"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressStackItem = ProgressStackItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("./constants.js");
function ProgressStackItem({ item }) {
    const { value, color, className, theme, title, content, loading } = item;
    const modifiers = {
        loading,
    };
    if (typeof color === 'undefined') {
        modifiers.theme = theme || 'default';
    }
    if (Number.isFinite(value)) {
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, constants_1.progressBlock)('item', modifiers, className), style: { width: `${value}%`, backgroundColor: color }, title: title, children: content }));
    }
    return null;
}
//# sourceMappingURL=ProgressStackItem.js.map
