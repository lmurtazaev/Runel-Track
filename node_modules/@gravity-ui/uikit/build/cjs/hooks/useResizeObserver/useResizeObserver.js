"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResizeObserver = useResizeObserver;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useResizeObserver({ ref, onResize, box, }) {
    React.useEffect(() => {
        const element = ref?.current;
        if (!element) {
            return undefined;
        }
        if (typeof window.ResizeObserver === 'undefined') {
            const handleResize = () => {
                onResize({});
            };
            window.addEventListener('resize', handleResize, false);
            return () => {
                window.removeEventListener('resize', handleResize, false);
            };
        }
        const observer = new ResizeObserver((entries) => {
            if (!entries.length) {
                return;
            }
            onResize({ observer });
        });
        observer.observe(element, { box });
        return () => {
            observer.disconnect();
        };
    }, [ref, onResize, box]);
}
//# sourceMappingURL=useResizeObserver.js.map
