import * as React from 'react';
import { layerManager } from "./LayerManager.js";
export function useLayer({ open, disableEscapeKeyDown, disableOutsideClick, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, contentRefs, enabled = true, type, }) {
    const layerConfigRef = React.useRef({
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs,
        type,
    });
    React.useEffect(() => {
        Object.assign(layerConfigRef.current, {
            disableEscapeKeyDown,
            disableOutsideClick,
            onEscapeKeyDown,
            onEnterKeyDown,
            onOutsideClick,
            onClose,
            contentRefs,
            enabled,
        });
    }, [
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs,
        enabled,
    ]);
    React.useEffect(() => {
        if (open && enabled) {
            const layerConfig = layerConfigRef.current;
            layerManager.add(layerConfig);
            return () => {
                layerManager.remove(layerConfig);
            };
        }
        return undefined;
    }, [open, enabled]);
}
//# sourceMappingURL=useLayer.js.map
