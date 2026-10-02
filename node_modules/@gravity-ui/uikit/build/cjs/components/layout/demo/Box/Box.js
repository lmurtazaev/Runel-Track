"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = Box;
const jsx_runtime_1 = require("react/jsx-runtime");
const Text_1 = require("../../../Text/Text.js");
const Flex_1 = require("../../Flex/Flex.js");
function Box({ children, w = '100%', h = '100%', minHeight, bgc = '#DDBEE1', bc = 'rosybrown', ...props }) {
    return ((0, jsx_runtime_1.jsx)(Flex_1.Flex, { ...props, style: {
            padding: 5,
            boxSizing: 'border-box',
            width: w,
            height: h,
            minHeight,
            border: `2px dashed ${bc}`,
            backgroundColor: bgc,
        }, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { variant: "code-1", color: "complementary", children: children }) }));
}
//# sourceMappingURL=Box.js.map
