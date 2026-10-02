"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarStackItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../utils/cn.js");
const b = (0, cn_1.block)('avatar-stack');
const AvatarStackItem = ({ children, style }) => {
    return ((0, jsx_runtime_1.jsx)("li", { className: b('item'), style: style, children: children }));
};
exports.AvatarStackItem = AvatarStackItem;
exports.AvatarStackItem.displayName = 'AvatarStack.Item';
//# sourceMappingURL=AvatarStackItem.js.map
