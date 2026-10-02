import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useControlledState } from "../../hooks/index.js";
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
export function AccordionProvider(props) {
    const { ariaLevel, children, arrowPosition, size, view, multiple, defaultValue, onUpdate, value, } = props;
    const getDefaultValue = () => {
        if (defaultValue !== undefined)
            return defaultValue;
        return multiple ? [] : null;
    };
    const [items, setItems] = useControlledState(value, getDefaultValue(), onUpdate);
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
    return (_jsx(AccordionContext.Provider, { value: {
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
export function useAccordion() {
    const state = React.useContext(AccordionContext);
    return state;
}
//# sourceMappingURL=AccordionContext.js.map
