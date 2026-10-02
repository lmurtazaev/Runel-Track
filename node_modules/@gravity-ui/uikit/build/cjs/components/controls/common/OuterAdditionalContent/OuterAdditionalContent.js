"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterAdditionalContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../../utils/cn.js");
const utils_1 = require("../../utils.js");
require("./OuterAdditionalContent.css");
const b = (0, cn_1.block)('outer-additional-content');
const OuterAdditionalContent = ({ errorMessage, note, noteId, errorMessageId, }) => {
    return errorMessage || note ? ((0, jsx_runtime_1.jsxs)("div", { className: b(), children: [errorMessage && ((0, jsx_runtime_1.jsx)("div", { className: b('error'), id: errorMessageId, "data-qa": utils_1.CONTROL_ERROR_MESSAGE_QA, children: errorMessage })), note && ((0, jsx_runtime_1.jsx)("div", { className: b('note'), id: noteId, children: note }))] })) : null;
};
exports.OuterAdditionalContent = OuterAdditionalContent;
//# sourceMappingURL=OuterAdditionalContent.js.map
