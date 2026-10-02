"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemeType = getThemeType;
const constants_1 = require("./constants.js");
function getThemeType(theme) {
    return constants_1.DARK_THEMES.includes(theme) ? 'dark' : 'light';
}
//# sourceMappingURL=getThemeType.js.map
