"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectCounter = SelectCounter;
const jsx_runtime_1 = require("react/jsx-runtime");
const Text_1 = require("../../../Text/index.js");
const cn_1 = require("../../../utils/cn.js");
const constants_1 = require("../../constants.js");
require("./SelectCounter.css");
const b = (0, cn_1.block)('select-counter');
function SelectCounter({ count, size, disabled }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: b({ size }), children: (0, jsx_runtime_1.jsx)(Text_1.Text, { variant: size === 'xl' ? 'body-2' : 'body-1', color: disabled ? 'hint' : 'primary', className: b('text'), qa: constants_1.SelectQa.COUNTER, children: count }) }));
}
//# sourceMappingURL=SelectCounter.js.map
