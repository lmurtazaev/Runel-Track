"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContainerThemeProps = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useLayoutContext_1 = require("../hooks/useLayoutContext.js");
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
const useContainerThemeProps = () => {
    const { theme, getClosestMediaProps } = (0, useLayoutContext_1.useLayoutContext)();
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
exports.useContainerThemeProps = useContainerThemeProps;
//# sourceMappingURL=useContainerThemeProps.js.map
