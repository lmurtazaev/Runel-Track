import * as React from 'react';
import { useLayoutContext } from "../hooks/useLayoutContext.js";
const pickContainerProps = ({ gutters, spaceRow, space, } = {}) => {
    const res = {};
    if (gutters) {
        res.gutters = gutters;
    }
    if (spaceRow || space) {
        res.spaceRow = spaceRow || space;
    }
    return res;
};
export const useContainerThemeProps = () => {
    const { theme, getClosestMediaProps } = useLayoutContext();
    const containerThemeProps = React.useMemo(() => ({
        ...pickContainerProps(theme.components?.container),
        ...pickContainerProps(getClosestMediaProps(theme.components?.container?.media)),
    }), [getClosestMediaProps, theme]);
    return {
        getClosestMediaProps,
        containerThemeProps,
        breakpoints: theme.breakpoints,
    };
};
//# sourceMappingURL=useContainerThemeProps.js.map
