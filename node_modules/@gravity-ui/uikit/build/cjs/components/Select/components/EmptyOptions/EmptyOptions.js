"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyOptions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../../utils/cn.js");
require("./EmptyOptions.css");
const b = (0, cn_1.block)('select-empty-placeholder');
const EmptyOptions = ({ renderEmptyOptions, filter }) => {
    return (0, jsx_runtime_1.jsx)("div", { className: b({ empty: !renderEmptyOptions }), children: renderEmptyOptions?.({ filter }) });
};
exports.EmptyOptions = EmptyOptions;
//# sourceMappingURL=EmptyOptions.js.map
