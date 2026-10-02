"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogBody = DialogBody;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const private_1 = require("../../../hooks/private/index.js");
const cn_1 = require("../../utils/cn.js");
const DialogPrivateContext_1 = require("../DialogPrivateContext.js");
require("./DialogBody.css");
const b = (0, cn_1.block)('dialog-body');
function DialogBody(props) {
    const { className, hasBorders = false } = props;
    const contentRef = React.useRef(null);
    const { disableHeightTransition } = React.useContext(DialogPrivateContext_1.DialogPrivateContext);
    (0, private_1.useAnimateHeight)({
        ref: contentRef,
        enabled: !disableHeightTransition,
    });
    return ((0, jsx_runtime_1.jsx)("div", { ref: contentRef, className: b({ 'has-borders': hasBorders }, className), children: props.children }));
}
//# sourceMappingURL=DialogBody.js.map
