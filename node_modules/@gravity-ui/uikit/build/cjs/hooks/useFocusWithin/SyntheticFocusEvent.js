"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntheticFocusEvent = void 0;
class SyntheticFocusEvent {
    nativeEvent;
    target;
    currentTarget;
    relatedTarget;
    bubbles;
    cancelable;
    defaultPrevented;
    eventPhase;
    isTrusted;
    timeStamp;
    type;
    constructor(type, nativeEvent, override = {}) {
        this.nativeEvent = nativeEvent;
        this.target = (override.target ?? nativeEvent.target);
        this.currentTarget = (override.currentTarget ?? nativeEvent.currentTarget);
        this.relatedTarget = nativeEvent.relatedTarget;
        this.bubbles = nativeEvent.bubbles;
        this.cancelable = nativeEvent.cancelable;
        this.defaultPrevented = nativeEvent.defaultPrevented;
        this.eventPhase = nativeEvent.eventPhase;
        this.isTrusted = nativeEvent.isTrusted;
        this.timeStamp = nativeEvent.timeStamp;
        this.type = type;
    }
    isDefaultPrevented() {
        return this.nativeEvent.defaultPrevented;
    }
    preventDefault() {
        this.defaultPrevented = true;
        this.nativeEvent.preventDefault();
    }
    stopPropagation() {
        this.nativeEvent.stopPropagation();
        this.isPropagationStopped = () => true;
    }
    isPropagationStopped() {
        return false;
    }
    persist() { }
}
exports.SyntheticFocusEvent = SyntheticFocusEvent;
//# sourceMappingURL=SyntheticFocusEvent.js.map
