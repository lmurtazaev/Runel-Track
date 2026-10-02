"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionProvider = AccordionProvider;
exports.useAccordion = useAccordion;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../hooks/index.js");
const AccordionContext = React.createContext({
    size: 'm',
    view: 'solid',
    multiple: false,
    arrowPosition: 'start',
    ariaLevel: 3,
    items: null,
    updateItems: () => { },
    registerSummary: () => { },
    unregisterSummary: () => { },
    getSummaryRefs: () => [],
});
function AccordionProvider(props) {
    const { ariaLevel, children, arrowPosition, size, view, multiple, defaultValue, onUpdate, value, } = props;
    const getDefaultValue = () => {
        if (defaultValue !== undefined)
            return defaultValue;
        return multiple ? [] : null;
    };
    const [items, setItems] = (0, hooks_1.useControlledState)(value, getDefaultValue(), onUpdate);
    const summaryRefsRef = React.useRef(new Map());
    React.useEffect(() => {
        if (!Array.isArray(items) && multiple) {
            setItems((items ? [items] : []));
            return;
        }
        // This useEffect is used only for handling the case of switching the 'multiple' value from false to true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multiple]);
    const updateItems = (itemValue) => {
        if (multiple) {
            // can cast to string[] because of multiple
            const castedPrev = (items || []);
            let newValue = [];
            if (castedPrev.includes(itemValue)) {
                // clicked on expanded -> close
                newValue = castedPrev.filter((item) => item !== itemValue);
            }
            else {
                // clicked on non-expanded -> open
                newValue = [...castedPrev, itemValue];
            }
            const res = newValue;
            setItems(res);
            return;
        }
        let newValue = itemValue;
        // clicked on expanded -> close
        if (itemValue === items) {
            newValue = null;
        }
        setItems(newValue);
    };
    const registerSummary = React.useCallback((id, ref) => {
        summaryRefsRef.current.set(id, ref);
    }, []);
    const unregisterSummary = React.useCallback((id) => {
        summaryRefsRef.current.delete(id);
    }, []);
    const getSummaryRefs = React.useCallback(() => {
        return Array.from(summaryRefsRef.current.values()).filter((ref) => !ref.disabled);
    }, []);
    return ((0, jsx_runtime_1.jsx)(AccordionContext.Provider, { value: {
            ariaLevel,
            arrowPosition,
            size,
            view,
            multiple,
            items,
            updateItems,
            registerSummary,
            unregisterSummary,
            getSummaryRefs,
        }, children: children }));
}
function useAccordion() {
    const state = React.useContext(AccordionContext);
    return state;
}
//# sourceMappingURL=AccordionContext.js.map
