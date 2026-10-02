import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from "../../../Text/index.js";
import { ThemeProvider } from "../../../theme/index.js";
import { Flex } from "../../Flex/Flex.js";
import { useLayoutContext } from "../../hooks/useLayoutContext.js";
import { sp } from "../../spacing/spacing.js";
function Title({ title }) {
    const { activeMediaQuery, theme: { breakpoints }, } = useLayoutContext();
    return (_jsxs(Flex, { direction: "column", space: "5", className: sp({ mb: '5' }), children: [title && (_jsx(Text, { variant: "subheader-2", as: "div", children: title })), _jsxs(Text, { color: "secondary", as: "div", children: ["Active media query: ", activeMediaQuery, ", breakpoint value:", ' ', breakpoints[activeMediaQuery]] })] }));
}
export const LayoutPresenter = ({ children, title, theme: config }) => {
    return (_jsxs(ThemeProvider, { layout: { config, fixBreakpoints: true }, scoped: true, children: [_jsx(Title, { title: title }), _jsx("div", { style: {
                    width: '100%',
                    height: '100%',
                    border: '3px dashed lightgray',
                }, children: children })] }));
};
//# sourceMappingURL=LayoutPresenter.js.map
