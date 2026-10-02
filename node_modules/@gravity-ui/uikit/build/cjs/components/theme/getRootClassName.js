"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootClassName = getRootClassName;
const cn_1 = require("../utils/cn.js");
const constants_1 = require("./constants.js");
const b = (0, cn_1.block)(constants_1.ROOT_CLASSNAME);
function getRootClassName({ theme } = {}, className) {
    return b({ theme }, className);
}
//# sourceMappingURL=getRootClassName.js.map
