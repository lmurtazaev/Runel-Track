"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeType = useThemeType;
const getThemeType_1 = require("./getThemeType.js");
const useThemeValue_1 = require("./useThemeValue.js");
function useThemeType() {
    return (0, getThemeType_1.getThemeType)((0, useThemeValue_1.useThemeValue)());
}
//# sourceMappingURL=useThemeType.js.map
