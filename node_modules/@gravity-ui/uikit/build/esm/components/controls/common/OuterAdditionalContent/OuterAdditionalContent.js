import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { block } from "../../../utils/cn.js";
import { CONTROL_ERROR_MESSAGE_QA } from "../../utils.js";
import "./OuterAdditionalContent.css";
const b = block('outer-additional-content');
export const OuterAdditionalContent = ({ errorMessage, note, noteId, errorMessageId, }) => {
    return errorMessage || note ? (_jsxs("div", { className: b(), children: [errorMessage && (_jsx("div", { className: b('error'), id: errorMessageId, "data-qa": CONTROL_ERROR_MESSAGE_QA, children: errorMessage })), note && (_jsx("div", { className: b('note'), id: noteId, children: note }))] })) : null;
};
//# sourceMappingURL=OuterAdditionalContent.js.map
