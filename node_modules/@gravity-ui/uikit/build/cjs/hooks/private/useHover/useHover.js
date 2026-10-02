"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHover = useHover;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useHover() {
    const [isHovering, setIsHovering] = React.useState(false);
    const onMouseEnter = React.useCallback(() => {
        setIsHovering(true);
    }, []);
    const onMouseLeave = React.useCallback(() => {
        setIsHovering(false);
    }, []);
    return [onMouseEnter, onMouseLeave, isHovering];
}
//# sourceMappingURL=useHover.js.map
