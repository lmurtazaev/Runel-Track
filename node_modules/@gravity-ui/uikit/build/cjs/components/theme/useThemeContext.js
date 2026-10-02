"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeContext = useThemeContext;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ThemeContext_1 = require("./ThemeContext.js");
function useThemeContext() {
    const state = React.useContext(ThemeContext_1.ThemeContext);
    if (state === undefined) {
        throw new Error('useTheme* hooks must be used within ThemeProvider');
    }
    return state;
}
//# sourceMappingURL=useThemeContext.js.map
