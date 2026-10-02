"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTabPanel = useTabPanel;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../constants.js");
const TabContext_1 = require("../contexts/TabContext.js");
function useTabPanel(tabPanelProps) {
    const tabContext = React.useContext(TabContext_1.TabContext);
    if (!tabContext) {
        throw new Error('<TabPanel> must be used within <TabProvider>');
    }
    const currentValue = tabContext.value;
    const parentId = tabContext.id;
    const tabId = `${parentId}:t:${tabPanelProps.value}`;
    const panelId = `${parentId}:p:${tabPanelProps.value}`;
    const isSelected = currentValue === tabPanelProps.value;
    const { value: _value, qa: _qa, ...htmlProps } = tabPanelProps;
    return {
        ...htmlProps,
        role: 'tabpanel',
        'aria-labelledby': tabId,
        id: panelId,
        className: (0, constants_1.bTabPanel)({ hidden: !isSelected }, tabPanelProps.className),
        'data-qa': tabPanelProps.qa,
    };
}
//# sourceMappingURL=useTabPanel.js.map
