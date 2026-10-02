'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useIntersection } from "../../hooks/index.js";
import { Loader } from "../Loader/index.js";
import { block } from "../utils/cn.js";
const b = block('list');
export const ListLoadingIndicator = (props) => {
    const ref = React.useRef(null);
    useIntersection({ element: ref.current, onIntersect: props?.onIntersect });
    return (_jsx("div", { ref: ref, className: b('loading-indicator'), children: _jsx(Loader, { qa: 'list-loader' }) }));
};
//# sourceMappingURL=ListLoadingIndicator.js.map
