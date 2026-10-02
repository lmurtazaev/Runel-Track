'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVariableSizeListElementType = exports.VariableSizeListElementType = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
exports.VariableSizeListElementType = React.forwardRef(({ style, role, listId, ...rest }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, role: role, id: listId, ...rest })));
exports.VariableSizeListElementType.displayName = 'VariableSizeListElementType';
const createVariableSizeListElementType = (role, listId) => {
    const Component = React.forwardRef((props, ref) => ((0, jsx_runtime_1.jsx)(exports.VariableSizeListElementType, { ...props, role: role, ref: ref, listId: listId })));
    Component.displayName = 'VariableSizeListElementType';
    return Component;
};
exports.createVariableSizeListElementType = createVariableSizeListElementType;
//# sourceMappingURL=VariableSizeListElementType.js.map
