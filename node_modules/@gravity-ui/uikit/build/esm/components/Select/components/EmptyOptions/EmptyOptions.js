import { jsx as _jsx } from "react/jsx-runtime";
import { block } from "../../../utils/cn.js";
import "./EmptyOptions.css";
const b = block('select-empty-placeholder');
export const EmptyOptions = ({ renderEmptyOptions, filter }) => {
    return _jsx("div", { className: b({ empty: !renderEmptyOptions }), children: renderEmptyOptions?.({ filter }) });
};
//# sourceMappingURL=EmptyOptions.js.map
