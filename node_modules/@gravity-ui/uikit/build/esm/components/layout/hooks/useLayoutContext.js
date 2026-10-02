import * as React from 'react';
import { LayoutContext } from "../contexts/LayoutContext.js";
import { getClosestMediaPropsFactory, isMediaActiveFactory } from "../utils/index.js";
/**
 * Quick access to theme and helpers to work with media queries
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#uselayoutcontext
 */
export const useLayoutContext = () => {
    const { activeMediaQuery, theme } = React.useContext(LayoutContext);
    const { isMediaActive, getClosestMediaProps } = React.useMemo(() => ({
        isMediaActive: isMediaActiveFactory(activeMediaQuery),
        getClosestMediaProps: getClosestMediaPropsFactory(activeMediaQuery),
    }), [activeMediaQuery]);
    return {
        theme,
        activeMediaQuery,
        isMediaActive,
        getClosestMediaProps,
    };
};
//# sourceMappingURL=useLayoutContext.js.map
