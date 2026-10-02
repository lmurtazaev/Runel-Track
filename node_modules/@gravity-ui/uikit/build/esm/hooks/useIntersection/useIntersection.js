import * as React from 'react';
export const useIntersection = ({ element, options, onIntersect }) => {
    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect?.();
            }
        }, options);
        if (element) {
            observer.observe(element);
        }
        return () => (element === null ? undefined : observer.unobserve(element));
    }, [element, options, onIntersect]);
};
//# sourceMappingURL=useIntersection.js.map
