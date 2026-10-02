'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinitionListAttributesContext = void 0;
exports.DefinitionListProvider = DefinitionListProvider;
exports.useDefinitionListAttributes = useDefinitionListAttributes;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
exports.DefinitionListAttributesContext = React.createContext(undefined);
function DefinitionListProvider({ direction, contentMaxWidth, nameMaxWidth, children, }) {
    const keyStyle = nameMaxWidth ? { maxWidth: nameMaxWidth, width: nameMaxWidth } : {};
    const valueStyle = typeof contentMaxWidth === 'number'
        ? { width: contentMaxWidth, maxWidth: contentMaxWidth }
        : {};
    return ((0, jsx_runtime_1.jsx)(exports.DefinitionListAttributesContext.Provider, { value: {
            keyStyle,
            valueStyle,
            direction,
        }, children: children }));
}
function useDefinitionListAttributes() {
    const state = React.useContext(exports.DefinitionListAttributesContext);
    if (state === undefined) {
        throw new Error('useDefinitionListAttributes must be used within DefinitionListProvider');
    }
    return state;
}
//# sourceMappingURL=DefinitionListContext.js.map
