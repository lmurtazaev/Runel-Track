'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useIntersection } from "../../../../hooks/index.js";
import { Loader } from "../../../Loader/Loader.js";
import { selectListBlock } from "../../constants.js";
export const SelectLoadingIndicator = (props) => {
    const ref = React.useRef(null);
    useIntersection({ element: ref.current, onIntersect: props?.onIntersect });
    return (_jsx("div", { ref: ref, className: selectListBlock('loading-indicator'), children: _jsx(Loader, {}) }));
};
//# sourceMappingURL=SelectLoadingIndicator.js.map
