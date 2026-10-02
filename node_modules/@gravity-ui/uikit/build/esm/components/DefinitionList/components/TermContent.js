import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { HelpMark } from "../../HelpMark/index.js";
import { b } from "../constants.js";
import i18n from "../i18n/index.js";
function NoteElement({ note }) {
    const { t } = i18n.useTranslation();
    if (!note) {
        return null;
    }
    if (typeof note === 'string') {
        return (_jsx(HelpMark, { className: b('note'), popoverProps: { placement: ['bottom', 'top'] }, "aria-label": t('label_note'), children: note }));
    }
    if (typeof note === 'object') {
        return (_jsx(HelpMark, { ...note, className: b('note', note.className), popoverProps: { placement: ['bottom', 'top'], ...note.popoverProps }, "aria-label": t('label_note') }));
    }
    return null;
}
export function TermContent({ note, name, direction }) {
    const noteElement = note ? (_jsxs(React.Fragment, { children: ["\u00A0", _jsx(NoteElement, { note: note })] })) : null;
    return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: b('term-wrapper'), children: [name, noteElement] }), direction === 'horizontal' && _jsx("div", { className: b('dots') })] }));
}
//# sourceMappingURL=TermContent.js.map
