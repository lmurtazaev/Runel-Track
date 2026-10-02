"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayoutEffect = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
// eslint-disable-next-line no-restricted-syntax
exports.useLayoutEffect = typeof window === 'undefined' ? () => { } : React.useLayoutEffect;
//# sourceMappingURL=useLayoutEffect.js.map
