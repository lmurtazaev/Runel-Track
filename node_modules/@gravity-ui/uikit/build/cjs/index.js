"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.configure = exports.Lang = void 0;
const tslib_1 = require("tslib");
var configure_1 = require("./utils/configure.js");
Object.defineProperty(exports, "Lang", { enumerable: true, get: function () { return configure_1.Lang; } });
Object.defineProperty(exports, "configure", { enumerable: true, get: function () { return configure_1.configure; } });
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return configure_1.getConfig; } });
tslib_1.__exportStar(require("./components/index.js"), exports);
tslib_1.__exportStar(require("./hooks/index.js"), exports);
tslib_1.__exportStar(require("./utils/dom.js"), exports);
//# sourceMappingURL=index.js.map
