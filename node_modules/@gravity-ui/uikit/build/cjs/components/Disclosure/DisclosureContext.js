'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisclosureToggleContext = exports.DisclosureAttributesContext = void 0;
exports.DisclosureProvider = DisclosureProvider;
exports.useDisclosureAttributes = useDisclosureAttributes;
exports.useToggleDisclosure = useToggleDisclosure;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../hooks/index.js");
exports.DisclosureAttributesContext = React.createContext(undefined);
exports.DisclosureToggleContext = React.createContext(undefined);
function DisclosureProvider(props) {
    const { size, disabled, defaultExpanded, arrowPosition, summary, keepMounted, onUpdate, onSummaryKeyDown, expanded: controlledExpanded, } = props;
    const [expanded, setExpanded] = React.useState(() => Boolean(defaultExpanded));
    const controlledMode = controlledExpanded !== undefined;
    const handleToggle = () => {
        setExpanded((prev) => !prev);
        const newValue = controlledMode ? !controlledExpanded : !expanded;
        onUpdate(newValue);
    };
    const ariaControls = (0, hooks_1.useUniqId)();
    const ariaLabelledby = `disclosure${ariaControls}`;
    return ((0, jsx_runtime_1.jsx)(exports.DisclosureAttributesContext.Provider, { value: {
            size,
            disabled,
            summary,
            arrowPosition,
            keepMounted,
            expanded: controlledMode ? controlledExpanded : expanded,
            ariaControls,
            ariaLabelledby,
            onSummaryKeyDown,
        }, children: (0, jsx_runtime_1.jsx)(exports.DisclosureToggleContext.Provider, { value: handleToggle, children: props.children }) }));
}
function useDisclosureAttributes() {
    const state = React.useContext(exports.DisclosureAttributesContext);
    if (state === undefined) {
        throw new Error('useDisclosureAttributes must be used within DisclosureProvider');
    }
    return state;
}
function useToggleDisclosure() {
    const state = React.useContext(exports.DisclosureToggleContext);
    if (state === undefined) {
        throw new Error('useToggleDisclosure must be used within DisclosureProvider');
    }
    return state;
}
//# sourceMappingURL=DisclosureContext.js.map
