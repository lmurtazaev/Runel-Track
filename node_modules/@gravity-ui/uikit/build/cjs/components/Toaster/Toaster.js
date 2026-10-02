"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toaster = void 0;
const EventEmitter_1 = require("../../utils/EventEmitter/index.js");
const getToastIndex_1 = require("./utilities/getToastIndex.js");
const hasToast_1 = require("./utilities/hasToast.js");
const removeToast_1 = require("./utilities/removeToast.js");
class Toaster {
    /** We were tried to notify about toaster changes, but no one were listened */
    hasUndelivered = false;
    toasts = [];
    eventEmitter = new EventEmitter_1.EventEmitter();
    destroy() {
        this.removeAll();
        this.eventEmitter.destroy();
    }
    add(toast) {
        let nextToasts = this.toasts;
        if ((0, hasToast_1.hasToast)(nextToasts, toast.name)) {
            nextToasts = (0, removeToast_1.removeToast)(nextToasts, toast.name);
        }
        this.toasts = [
            ...nextToasts,
            {
                ...toast,
                addedAt: Date.now(),
                ref: { current: null },
            },
        ];
        this.notify();
    }
    remove(name) {
        this.toasts = (0, removeToast_1.removeToast)(this.toasts, name);
        this.notify();
    }
    removeAll() {
        this.toasts = [];
        this.notify();
    }
    update(name, overrideOptions) {
        if (!(0, hasToast_1.hasToast)(this.toasts, name)) {
            return;
        }
        const index = (0, getToastIndex_1.getToastIndex)(this.toasts, name);
        this.toasts = [
            ...this.toasts.slice(0, index),
            {
                ...this.toasts[index],
                ...overrideOptions,
            },
            ...this.toasts.slice(index + 1),
        ];
        this.notify();
    }
    has(name) {
        return (0, hasToast_1.hasToast)(this.toasts, name);
    }
    subscribe(listener) {
        const unsubscribe = this.eventEmitter.subscribe('toasts-change', listener);
        if (this.hasUndelivered) {
            this.notify();
        }
        return unsubscribe;
    }
    notify() {
        const isDelivered = this.eventEmitter.notify('toasts-change', [this.toasts]);
        this.hasUndelivered = !isDelivered;
    }
}
exports.Toaster = Toaster;
//# sourceMappingURL=Toaster.js.map
