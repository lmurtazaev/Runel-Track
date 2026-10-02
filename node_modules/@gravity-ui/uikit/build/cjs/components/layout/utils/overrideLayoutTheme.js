"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideLayoutTheme = overrideLayoutTheme;
const tslib_1 = require("tslib");
const merge_1 = tslib_1.__importDefault(require("lodash/merge.js"));
/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
function overrideLayoutTheme({ theme, override }) {
    return (0, merge_1.default)(theme, override);
}
//# sourceMappingURL=overrideLayoutTheme.js.map
