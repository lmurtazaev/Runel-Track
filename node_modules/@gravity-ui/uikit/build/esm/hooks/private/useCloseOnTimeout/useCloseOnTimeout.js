import { useTimeout } from "../../index.js";
import { useHover } from "../useHover/index.js";
/**
 * Invokes callback after given amount of time unless mouse is on the element
 * @param onClose
 * @param timeout
 * @returns mouse event handlers
 */
export function useCloseOnTimeout({ onClose, timeout }) {
    const [onMouseOver, onMouseLeave, isHovering] = useHover();
    useTimeout(onClose, isHovering ? null : timeout);
    return { onMouseOver, onMouseLeave };
}
//# sourceMappingURL=useCloseOnTimeout.js.map
