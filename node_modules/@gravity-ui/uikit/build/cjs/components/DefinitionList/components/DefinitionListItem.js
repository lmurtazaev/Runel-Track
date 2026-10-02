"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinitionListItem = DefinitionListItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../constants.js");
const utils_1 = require("../utils.js");
const DefinitionContent_1 = require("./DefinitionContent.js");
const DefinitionListContext_1 = require("./DefinitionListContext.js");
const TermContent_1 = require("./TermContent.js");
function DefinitionListItem({ name, children, copyText, note, qa }) {
    const { direction, keyStyle, valueStyle } = (0, DefinitionListContext_1.useDefinitionListAttributes)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, constants_1.b)('item'), "data-qa": qa, children: [(0, jsx_runtime_1.jsx)("dt", { className: (0, constants_1.b)('term-container'), style: keyStyle, children: (0, jsx_runtime_1.jsx)(TermContent_1.TermContent, { direction: direction, name: name, note: note }) }), (0, jsx_runtime_1.jsx)("dd", { className: (0, constants_1.b)('definition'), style: {
                    ...valueStyle,
                    lineBreak: typeof children === 'string' && (0, utils_1.isUnbreakableOver)(20)(children)
                        ? 'anywhere'
                        : undefined,
                }, children: (0, jsx_runtime_1.jsx)(DefinitionContent_1.DefinitionContent, { copyText: copyText, children: children }) })] }));
}
DefinitionListItem.displayName = 'DefinitionListItem';
//# sourceMappingURL=DefinitionListItem.js.map
