'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileContext = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("./constants.js");
const initialValue = {
    mobile: false,
    platform: constants_1.Platform.BROWSER,
    useHistory: () => ({ action: '', replace() { }, push() { }, goBack() { } }),
    useLocation: () => ({ pathname: '', search: '', hash: '' }),
};
exports.MobileContext = React.createContext(initialValue);
//# sourceMappingURL=MobileContext.js.map
