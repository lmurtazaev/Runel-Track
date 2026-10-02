"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationEllipsis = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../../utils/cn.js");
require("./PaginationEllipsis.css");
const b = (0, cn_1.block)('pagination-ellipsis');
const PaginationEllipsis = ({ size, className }) => {
    return (0, jsx_runtime_1.jsx)("div", { className: b({ size }, className), children: "..." });
};
exports.PaginationEllipsis = PaginationEllipsis;
//# sourceMappingURL=PaginationEllipsis.js.map
