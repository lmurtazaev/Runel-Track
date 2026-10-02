import * as React from 'react';
export function useMatchMedia({ media }) {
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
