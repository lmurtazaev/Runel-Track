"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBroker = exports.EventBroker = void 0;
const cn_1 = require("../cn.js");
class EventBroker {
    subscriptions = [];
    componentPrefix;
    constructor(prefix) {
        this.componentPrefix = prefix;
    }
    subscribe(subscription) {
        this.subscriptions.push(subscription);
    }
    unsubscribe(subscription) {
        const index = this.subscriptions.indexOf(subscription);
        if (index > -1) {
            this.subscriptions.splice(index, 1);
        }
    }
    publish({ componentId, ...restData }) {
        this.subscriptions.forEach((fn) => fn({
            ...restData,
            componentId: this.componentPrefix
                ? `${this.componentPrefix}${componentId}`
                : componentId,
        }));
    }
    withEventPublisher(componentId, qa) {
        return (eventBrokerData) => {
            this.publish({
                ...eventBrokerData,
                componentId,
                qa,
            });
        };
    }
}
exports.EventBroker = EventBroker;
exports.eventBroker = new EventBroker(cn_1.NAMESPACE);
//# sourceMappingURL=EventBroker.js.map
