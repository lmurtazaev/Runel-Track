'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutContext = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../constants.js");
exports.LayoutContext = React.createContext({
    theme: constants_1.DEFAULT_LAYOUT_THEME,
    activeMediaQuery: 's',
    fixBreakpoints: false,
});
//# sourceMappingURL=LayoutContext.js.map
