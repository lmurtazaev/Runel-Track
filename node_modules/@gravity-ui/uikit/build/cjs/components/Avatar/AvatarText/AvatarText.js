"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../constants.js");
const utils_1 = require("./utils.js");
const AvatarText = ({ text, color, size }) => {
    const style = { color };
    const displayText = (0, utils_1.getAvatarDisplayText)(text, size);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, constants_1.bAvatar)('text'), style: style, children: displayText }));
};
exports.AvatarText = AvatarText;
//# sourceMappingURL=AvatarText.js.map
