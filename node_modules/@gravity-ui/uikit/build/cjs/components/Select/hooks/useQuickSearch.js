"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuickSearch = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../constants.js");
const utils_1 = require("../utils.js");
const useQuickSearch = (props) => {
    const { onChange, open, disabled } = props;
    const [search, setSearch] = React.useState('');
    const [timer, setTimer] = React.useState();
    const handleTimer = React.useCallback((nextSearch) => {
        clearTimeout(timer);
        if (nextSearch) {
            const nextTimer = window.setTimeout(() => setSearch(''), constants_1.QUICK_SEARCH_TIMEOUT);
            setTimer(nextTimer);
        }
    }, [timer]);
    const handleSearch = React.useCallback((e) => {
        e.stopPropagation();
        const nextSearch = (0, utils_1.getNextQuickSearch)(e.key, search);
        if (search !== nextSearch) {
            handleTimer(nextSearch);
            setSearch(nextSearch);
        }
    }, [handleTimer, search]);
    React.useEffect(() => {
        if (open && !disabled) {
            document.addEventListener('keydown', handleSearch);
        }
        else if (!open && !disabled) {
            setSearch('');
        }
        return () => {
            if (open && !disabled) {
                document.removeEventListener('keydown', handleSearch);
            }
        };
    }, [handleSearch, open, disabled]);
    React.useEffect(() => {
        if (!open) {
            clearTimeout(timer);
        }
        return () => clearTimeout(timer);
    }, [open, timer]);
    React.useEffect(() => {
        onChange(search);
    }, [onChange, search]);
};
exports.useQuickSearch = useQuickSearch;
//# sourceMappingURL=useQuickSearch.js.map
