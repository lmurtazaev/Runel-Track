"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListFilter = useListFilter;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const debounce_1 = tslib_1.__importDefault(require("lodash/debounce.js"));
const defaultFilterItems_1 = require("../utils/defaultFilterItems.js");
function defaultFilterFn(value, item) {
    return item && typeof item === 'object' && 'title' in item && typeof item.title === 'string'
        ? item.title.toLowerCase().includes((value || '').toLowerCase())
        : true;
}
/**
 * Ready-to-use logic for filtering tree-like data structures
 *
 * ```tsx
 * const {item: filteredItems,...listFiltration} = useListFIlter({items});
 * const list = useList({items: filteredItems});
 *
 * <TextInput {...listFiltration} />
 * ```
 */
function useListFilter({ items: externalItems, initialFilterValue = '', filterItem, onFilterChange, filterItems, debounceTimeout = 300, }) {
    const filterRef = React.useRef(null);
    const [filter, setFilter] = React.useState(initialFilterValue);
    const [prevItems, setPrevItems] = React.useState(externalItems);
    const [filteredItems, setFilteredItems] = React.useState(externalItems);
    const filterItemsFn = React.useCallback((nextFilterValue, items) => {
        if (filterItems) {
            return () => filterItems(nextFilterValue, items);
        }
        if (nextFilterValue) {
            const filterItemFn = filterItem || defaultFilterFn;
            return () => (0, defaultFilterItems_1.defaultFilterItems)(items, (item) => filterItemFn(nextFilterValue, item));
        }
        return () => items;
    }, [filterItem, filterItems]);
    if (externalItems !== prevItems) {
        setFilteredItems(filterItemsFn(filter, externalItems));
        setPrevItems(externalItems);
    }
    const debouncedFn = React.useCallback((0, debounce_1.default)((value) => setFilteredItems(filterItemsFn(value, externalItems)), debounceTimeout), [setFilteredItems, filterItemsFn, externalItems, debounceTimeout]);
    const { onFilterUpdate, reset } = React.useMemo(() => {
        return {
            reset: () => {
                setFilter(initialFilterValue);
                onFilterChange?.(initialFilterValue);
                debouncedFn(initialFilterValue);
            },
            onFilterUpdate: (nextFilterValue) => {
                setFilter(nextFilterValue);
                onFilterChange?.(nextFilterValue);
                debouncedFn(nextFilterValue);
            },
        };
    }, [debouncedFn, initialFilterValue, onFilterChange]);
    return {
        filterRef,
        filter,
        reset,
        items: filteredItems,
        onFilterUpdate,
    };
}
//# sourceMappingURL=useListFilter.js.map
