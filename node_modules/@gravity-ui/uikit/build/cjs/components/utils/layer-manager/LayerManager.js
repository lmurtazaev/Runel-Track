'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayersCount = exports.layerManager = void 0;
const constants_1 = require("../../../constants.js");
const event_broker_1 = require("../event-broker/index.js");
class LayerManager {
    stack = [];
    mouseDownLayerTarget;
    add(config) {
        this.stack.push(config);
        if (this.stack.length === 1) {
            this.addListeners();
        }
        this.notifyLayersChange();
    }
    remove(config) {
        const index = this.stack.indexOf(config);
        this.stack.splice(index, 1);
        if (this.stack.length === 0) {
            this.removeListeners();
        }
        this.notifyLayersChange();
    }
    getLayersCount() {
        return this.stack.length;
    }
    getLayers() {
        return this.stack.map(({ type }) => ({ type }));
    }
    addListeners() {
        document.addEventListener('keydown', this.handleDocumentKeyDown);
        document.addEventListener('click', this.handleDocumentClick, true);
        document.addEventListener('mousedown', this.handleDocumentMouseDown, true);
    }
    removeListeners() {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
        document.removeEventListener('click', this.handleDocumentClick, true);
        document.removeEventListener('mousedown', this.handleDocumentMouseDown, true);
    }
    notifyLayersChange() {
        event_broker_1.eventBroker.publish({
            componentId: 'LayerManager',
            eventId: 'layerschange',
            meta: {
                /**
                 * @deprecated use layers
                 */
                layersCount: this.getLayersCount(),
                layers: this.getLayers(),
            },
        });
    }
    handleDocumentKeyDown = (event) => {
        if (event.code === constants_1.KeyCode.ESCAPE) {
            const topLayer = this.getTopLayer();
            if (!topLayer.disableEscapeKeyDown) {
                topLayer.onEscapeKeyDown?.(event);
                topLayer.onClose?.(event, 'escapeKeyDown');
            }
        }
        if (event.code === constants_1.KeyCode.ENTER) {
            const topLayer = this.getTopLayer();
            topLayer.onEnterKeyDown?.(event);
        }
    };
    handleDocumentClick = (event) => {
        if (this.isToastClick(event)) {
            return;
        }
        let layer;
        let mouseDownTarget = null;
        if (this.mouseDownLayerTarget) {
            layer = this.mouseDownLayerTarget.layer;
            mouseDownTarget = this.mouseDownLayerTarget.target;
            this.mouseDownLayerTarget = undefined;
            if (!this.stack.includes(layer)) {
                return;
            }
        }
        else {
            layer = this.getTopLayer();
        }
        if (!layer.disableOutsideClick && this.isOutsideClick(layer, event, mouseDownTarget)) {
            layer.onOutsideClick?.(event);
            layer.onClose?.(event, 'outsideClick');
        }
    };
    handleDocumentMouseDown = (event) => {
        const layer = this.getTopLayer();
        if (layer) {
            this.mouseDownLayerTarget = { layer, target: event.target };
        }
    };
    getTopLayer() {
        return this.stack[this.stack.length - 1];
    }
    isOutsideClick(layer, event, mouseDownTarget = null) {
        const contentElements = layer.contentRefs || [];
        const { target } = event;
        const composedPath = typeof event.composedPath === 'function' ? event.composedPath() : [];
        if (contentElements.length > 0) {
            const isClickOnContentElements = contentElements.some((el) => el?.current?.contains?.(target) ||
                el?.current?.contains?.(mouseDownTarget) ||
                composedPath.includes(el?.current));
            return !isClickOnContentElements;
        }
        return false;
    }
    isToastClick(event) {
        const composedPath = typeof event.composedPath === 'function' ? event.composedPath() : [];
        return composedPath.some((el) => {
            return Boolean(el?.dataset?.toast);
        });
    }
}
exports.layerManager = new LayerManager();
const getLayersCount = () => {
    return exports.layerManager.getLayersCount();
};
exports.getLayersCount = getLayersCount;
//# sourceMappingURL=LayerManager.js.map
