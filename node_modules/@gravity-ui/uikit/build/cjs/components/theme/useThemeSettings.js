"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeSettings = useThemeSettings;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ThemeSettingsContext_1 = require("./ThemeSettingsContext.js");
function useThemeSettings() {
    const settings = React.useContext(ThemeSettingsContext_1.ThemeSettingsContext);
    if (settings === undefined) {
        throw new Error('useThemeSettings must be used within ThemeProvider');
    }
    return settings;
}
//# sourceMappingURL=useThemeSettings.js.map
