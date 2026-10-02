"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMatchMedia = useMatchMedia;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useMatchMedia({ media }) {
    const mql = React.useMemo(() => (typeof window === 'undefined' ? null : window.matchMedia(media)), [media]);
    const [matches, setMatches] = React.useState(Boolean(mql?.matches));
    React.useEffect(() => {
        const handleChange = (event) => {
            setMatches(event.matches);
        };
        setMatches(Boolean(mql?.matches));
        mql?.addEventListener('change', handleChange);
        return () => mql?.removeEventListener('change', handleChange);
    }, [mql]);
    return matches;
}
//# sourceMappingURL=useMatchMedia.js.map
