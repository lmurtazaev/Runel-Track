"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootMobileClassName = exports.Platform = void 0;
const cn_1 = require("../utils/cn.js");
var Platform;
(function (Platform) {
    Platform["IOS"] = "ios";
    Platform["ANDROID"] = "android";
    Platform["BROWSER"] = "browser";
})(Platform || (exports.Platform = Platform = {}));
const b = (0, cn_1.block)('root');
exports.rootMobileClassName = b({ mobile: true }).split(/\s+/)[1];
//# sourceMappingURL=constants.js.map
