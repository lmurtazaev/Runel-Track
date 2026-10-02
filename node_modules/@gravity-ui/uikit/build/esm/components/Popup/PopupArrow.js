import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { block } from "../utils/cn.js";
import "./Popup.css";
const b = block('popup');
export const PopupArrow = React.forwardRef(function PopupArrow({ styles }, ref) {
    return (_jsx("div", { ref: ref, className: b('arrow'), style: styles, children: _jsxs("div", { className: b('arrow-content'), children: [_jsx("div", { className: b('arrow-circle-wrapper'), children: _jsx("div", { className: b('arrow-circle', { left: true }) }) }), _jsx("div", { className: b('arrow-circle-wrapper'), children: _jsx("div", { className: b('arrow-circle', { right: true }) }) })] }) }));
});
//# sourceMappingURL=PopupArrow.js.map
