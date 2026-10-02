"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutPresenter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Text_1 = require("../../../Text/index.js");
const theme_1 = require("../../../theme/index.js");
const Flex_1 = require("../../Flex/Flex.js");
const useLayoutContext_1 = require("../../hooks/useLayoutContext.js");
const spacing_1 = require("../../spacing/spacing.js");
function Title({ title }) {
    const { activeMediaQuery, theme: { breakpoints }, } = (0, useLayoutContext_1.useLayoutContext)();
    return ((0, jsx_runtime_1.jsxs)(Flex_1.Flex, { direction: "column", space: "5", className: (0, spacing_1.sp)({ mb: '5' }), children: [title && ((0, jsx_runtime_1.jsx)(Text_1.Text, { variant: "subheader-2", as: "div", children: title })), (0, jsx_runtime_1.jsxs)(Text_1.Text, { color: "secondary", as: "div", children: ["Active media query: ", activeMediaQuery, ", breakpoint value:", ' ', breakpoints[activeMediaQuery]] })] }));
}
const LayoutPresenter = ({ children, title, theme: config }) => {
    return ((0, jsx_runtime_1.jsxs)(theme_1.ThemeProvider, { layout: { config, fixBreakpoints: true }, scoped: true, children: [(0, jsx_runtime_1.jsx)(Title, { title: title }), (0, jsx_runtime_1.jsx)("div", { style: {
                    width: '100%',
                    height: '100%',
                    border: '3px dashed lightgray',
                }, children: children })] }));
};
exports.LayoutPresenter = LayoutPresenter;
//# sourceMappingURL=LayoutPresenter.js.map
