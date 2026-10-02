import { jsx as _jsx } from "react/jsx-runtime";
import { block } from "../../../utils/cn.js";
import "./PaginationEllipsis.css";
const b = block('pagination-ellipsis');
export const PaginationEllipsis = ({ size, className }) => {
    return _jsx("div", { className: b({ size }, className), children: "..." });
};
//# sourceMappingURL=PaginationEllipsis.js.map
