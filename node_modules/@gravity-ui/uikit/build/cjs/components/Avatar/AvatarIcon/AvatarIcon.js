"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Icon_1 = require("../../Icon/index.js");
const constants_1 = require("../constants.js");
const avatarSizeToIconSize = {
    '3xs': 10,
    '2xs': 12,
    xs: 14,
    s: 16,
    m: 16,
    l: 20,
    xl: 24,
};
const AvatarIcon = ({ icon, color, size }) => {
    const style = { color };
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, constants_1.bAvatar)('icon'), style: style, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icon, size: avatarSizeToIconSize[size] }) }));
};
exports.AvatarIcon = AvatarIcon;
//# sourceMappingURL=AvatarIcon.js.map
