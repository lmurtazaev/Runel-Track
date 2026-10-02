import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ClipboardButton } from "../../ClipboardButton/index.js";
import { b } from "../constants.js";
export function DefinitionContent({ copyText, children }) {
    const definitionContent = children ?? '—';
    return copyText ? (_jsxs("div", { className: b('copy-container'), children: [definitionContent, _jsx(ClipboardButton, { size: "s", text: copyText, className: b('copy-button'), view: 'flat-secondary' })] })) : (definitionContent);
}
//# sourceMappingURL=DefinitionContent.js.map
