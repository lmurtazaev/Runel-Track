"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
/**
 * Class for emitting events
 * @example
 * import {EventEmitter} from '@gravity-ui/uikit';
 *
 * const emitter = new EventEmitter<{
 *   foobar: [string, number]
 * }>();
 *
 * emitter.notify('foobar', ['foo', 0]); // returns "false", because there is no attached listeners yet
 *
 * const unsubscribe = emitter.subscribe('foobar', (a, b) => {
 *   console.log(a, b);
 * });
 *
 * emitter.notify('foobar', ['foo', 1]); // returns "true", because listener is appeared
 */
class EventEmitter {
    listeners;
    constructor() {
        this.listeners = {};
    }
    destroy() {
        this.listeners = {};
    }
    subscribe(event, listener) {
        if (typeof listener === 'function') {
            this.listeners[event] = (this.listeners[event] || []).concat(listener);
        }
        return () => {
            this.listeners[event] = this.listeners[event]?.filter((currentListener) => listener !== currentListener);
        };
    }
    notify(event, data) {
        if (!this.listeners[event]?.length) {
            return false;
        }
        for (const listener of this.listeners[event]) {
            listener(...data);
        }
        return true;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map
