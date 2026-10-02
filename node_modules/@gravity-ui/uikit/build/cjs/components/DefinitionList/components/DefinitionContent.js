"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinitionContent = DefinitionContent;
const jsx_runtime_1 = require("react/jsx-runtime");
const ClipboardButton_1 = require("../../ClipboardButton/index.js");
const constants_1 = require("../constants.js");
function DefinitionContent({ copyText, children }) {
    const definitionContent = children ?? '—';
    return copyText ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, constants_1.b)('copy-container'), children: [definitionContent, (0, jsx_runtime_1.jsx)(ClipboardButton_1.ClipboardButton, { size: "s", text: copyText, className: (0, constants_1.b)('copy-button'), view: 'flat-secondary' })] })) : (definitionContent);
}
//# sourceMappingURL=DefinitionContent.js.map
