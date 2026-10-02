"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressWithStack = ProgressWithStack;
const jsx_runtime_1 = require("react/jsx-runtime");
const ProgressInnerText_1 = require("./ProgressInnerText.js");
const ProgressStackItem_1 = require("./ProgressStackItem.js");
const constants_1 = require("./constants.js");
const utils_1 = require("./utils.js");
function ProgressWithStack(props) {
    const { stack, stackClassName, value, text } = props;
    const offset = (0, utils_1.getOffset)(value || (0, utils_1.getValueFromStack)(stack));
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, constants_1.progressBlock)('stack', stackClassName), style: { transform: `translateX(calc(var(--g-flow-direction) * ${offset}%))` }, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, constants_1.progressBlock)('item'), style: { width: `${-offset}%` } }), stack.map((item, index) => ((0, jsx_runtime_1.jsx)(ProgressStackItem_1.ProgressStackItem, { item: item }, index))), (0, jsx_runtime_1.jsx)(ProgressInnerText_1.ProgressInnerText, { offset: offset, text: text })] }));
}
//# sourceMappingURL=ProgressWithStack.js.map
