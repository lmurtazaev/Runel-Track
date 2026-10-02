"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermContent = TermContent;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const HelpMark_1 = require("../../HelpMark/index.js");
const constants_1 = require("../constants.js");
const i18n_1 = tslib_1.__importDefault(require("../i18n/index.js"));
function NoteElement({ note }) {
    const { t } = i18n_1.default.useTranslation();
    if (!note) {
        return null;
    }
    if (typeof note === 'string') {
        return ((0, jsx_runtime_1.jsx)(HelpMark_1.HelpMark, { className: (0, constants_1.b)('note'), popoverProps: { placement: ['bottom', 'top'] }, "aria-label": t('label_note'), children: note }));
    }
    if (typeof note === 'object') {
        return ((0, jsx_runtime_1.jsx)(HelpMark_1.HelpMark, { ...note, className: (0, constants_1.b)('note', note.className), popoverProps: { placement: ['bottom', 'top'], ...note.popoverProps }, "aria-label": t('label_note') }));
    }
    return null;
}
function TermContent({ note, name, direction }) {
    const noteElement = note ? ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: ["\u00A0", (0, jsx_runtime_1.jsx)(NoteElement, { note: note })] })) : null;
    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, constants_1.b)('term-wrapper'), children: [name, noteElement] }), direction === 'horizontal' && (0, jsx_runtime_1.jsx)("div", { className: (0, constants_1.b)('dots') })] }));
}
//# sourceMappingURL=TermContent.js.map
