"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorText = exports.TEXT_COLORS = exports.text = exports.TEXT_VARIANTS = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./Text.js"), exports);
var text_1 = require("./text/text.js");
Object.defineProperty(exports, "TEXT_VARIANTS", { enumerable: true, get: function () { return text_1.TEXT_VARIANTS; } });
Object.defineProperty(exports, "text", { enumerable: true, get: function () { return text_1.text; } });
var colorText_1 = require("./colorText/colorText.js");
Object.defineProperty(exports, "TEXT_COLORS", { enumerable: true, get: function () { return colorText_1.TEXT_COLORS; } });
Object.defineProperty(exports, "colorText", { enumerable: true, get: function () { return colorText_1.colorText; } });
//# sourceMappingURL=index.js.map
