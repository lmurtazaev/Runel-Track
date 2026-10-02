import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useAnimateHeight } from "../../../hooks/private/index.js";
import { block } from "../../utils/cn.js";
import { DialogPrivateContext } from "../DialogPrivateContext.js";
import "./DialogBody.css";
const b = block('dialog-body');
export function DialogBody(props) {
    const { className, hasBorders = false } = props;
    const contentRef = React.useRef(null);
    const { disableHeightTransition } = React.useContext(DialogPrivateContext);
    useAnimateHeight({
        ref: contentRef,
        enabled: !disableHeightTransition,
    });
    return (_jsx("div", { ref: contentRef, className: b({ 'has-borders': hasBorders }, className), children: props.children }));
}
//# sourceMappingURL=DialogBody.js.map
