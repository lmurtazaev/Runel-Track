"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIntersection = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useIntersection = ({ element, options, onIntersect }) => {
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
exports.useIntersection = useIntersection;
//# sourceMappingURL=useIntersection.js.map
