import * as React from 'react';
import { ThemeSettingsContext } from "./ThemeSettingsContext.js";
export function useThemeSettings() {
    const settings = React.useContext(ThemeSettingsContext);
    if (settings === undefined) {
        throw new Error('useThemeSettings must be used within ThemeProvider');
    }
    return settings;
}
//# sourceMappingURL=useThemeSettings.js.map
