"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayer = useLayer;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const LayerManager_1 = require("./LayerManager.js");
function useLayer({ open, disableEscapeKeyDown, disableOutsideClick, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, contentRefs, enabled = true, type, }) {
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
            LayerManager_1.layerManager.add(layerConfig);
            return () => {
                LayerManager_1.layerManager.remove(layerConfig);
            };
        }
        return undefined;
    }, [open, enabled]);
}
//# sourceMappingURL=useLayer.js.map
