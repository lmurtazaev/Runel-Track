'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLoadingIndicator = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../hooks/index.js");
const Loader_1 = require("../Loader/index.js");
const cn_1 = require("../utils/cn.js");
const b = (0, cn_1.block)('list');
const ListLoadingIndicator = (props) => {
    const ref = React.useRef(null);
    (0, hooks_1.useIntersection)({ element: ref.current, onIntersect: props?.onIntersect });
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: b('loading-indicator'), children: (0, jsx_runtime_1.jsx)(Loader_1.Loader, { qa: 'list-loader' }) }));
};
exports.ListLoadingIndicator = ListLoadingIndicator;
//# sourceMappingURL=ListLoadingIndicator.js.map
