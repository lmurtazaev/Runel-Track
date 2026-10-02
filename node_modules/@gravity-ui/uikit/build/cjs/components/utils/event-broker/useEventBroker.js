'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventBroker = useEventBroker;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const EventBroker_1 = require("./EventBroker.js");
function useEventBroker(subscription, broker = EventBroker_1.eventBroker) {
    React.useEffect(() => {
        broker.subscribe(subscription);
        return () => broker.unsubscribe(subscription);
    }, [broker, subscription]);
}
//# sourceMappingURL=useEventBroker.js.map
