"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressInnerText = ProgressInnerText;
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("./constants.js");
function ProgressInnerText(props) {
    const { text, offset = 0 } = props;
    if (!text) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, constants_1.progressBlock)('text-inner'), style: { transform: `translateX(calc(var(--g-flow-direction) * ${-offset}%))` }, children: text }));
}
//# sourceMappingURL=ProgressInnerText.js.map
