import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { b } from "../constants.js";
import { isUnbreakableOver } from "../utils.js";
import { DefinitionContent } from "./DefinitionContent.js";
import { useDefinitionListAttributes } from "./DefinitionListContext.js";
import { TermContent } from "./TermContent.js";
export function DefinitionListItem({ name, children, copyText, note, qa }) {
    const { direction, keyStyle, valueStyle } = useDefinitionListAttributes();
    return (_jsxs("div", { className: b('item'), "data-qa": qa, children: [_jsx("dt", { className: b('term-container'), style: keyStyle, children: _jsx(TermContent, { direction: direction, name: name, note: note }) }), _jsx("dd", { className: b('definition'), style: {
                    ...valueStyle,
                    lineBreak: typeof children === 'string' && isUnbreakableOver(20)(children)
                        ? 'anywhere'
                        : undefined,
                }, children: _jsx(DefinitionContent, { copyText: copyText, children: children }) })] }));
}
DefinitionListItem.displayName = 'DefinitionListItem';
//# sourceMappingURL=DefinitionListItem.js.map
