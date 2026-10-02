"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeItemSize = void 0;
const constants_1 = require("../constants.js");
const computeItemSize = (size, hasSubRows = false) => {
    return constants_1.modToHeight[size][Number(hasSubRows)];
};
exports.computeItemSize = computeItemSize;
//# sourceMappingURL=computeItemSize.js.map
