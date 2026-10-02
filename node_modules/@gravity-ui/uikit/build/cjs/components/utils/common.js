"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIcon = exports.isSvg = void 0;
exports.getUniqId = getUniqId;
const Icon_1 = require("../Icon/index.js");
const cn_1 = require("./cn.js");
const isOfType_1 = require("./isOfType.js");
let nextUniqueId = 1;
function getUniqId() {
    return `${cn_1.NAMESPACE}uniq-${nextUniqueId++}`;
}
exports.isSvg = (0, isOfType_1.isOfType)('svg');
exports.isIcon = (0, isOfType_1.isOfType)(Icon_1.Icon);
//# sourceMappingURL=common.js.map
