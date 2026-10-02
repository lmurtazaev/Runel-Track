"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayoutContext = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const LayoutContext_1 = require("../contexts/LayoutContext.js");
const utils_1 = require("../utils/index.js");
/**
 * Quick access to theme and helpers to work with media queries
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#uselayoutcontext
 */
const useLayoutContext = () => {
    const { activeMediaQuery, theme } = React.useContext(LayoutContext_1.LayoutContext);
    const { isMediaActive, getClosestMediaProps } = React.useMemo(() => ({
        isMediaActive: (0, utils_1.isMediaActiveFactory)(activeMediaQuery),
        getClosestMediaProps: (0, utils_1.getClosestMediaPropsFactory)(activeMediaQuery),
    }), [activeMediaQuery]);
    return {
        theme,
        activeMediaQuery,
        isMediaActive,
        getClosestMediaProps,
    };
};
exports.useLayoutContext = useLayoutContext;
//# sourceMappingURL=useLayoutContext.js.map
