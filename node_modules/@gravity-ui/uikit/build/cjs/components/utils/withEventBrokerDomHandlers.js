'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withEventBrokerDomHandlers = withEventBrokerDomHandlers;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const event_broker_1 = require("./event-broker/index.js");
const getComponentName_1 = require("./getComponentName.js");
function withEventBrokerDomHandlers(Component, eventTypes, eventBrokerData) {
    const componentName = (0, getComponentName_1.getComponentName)(Component);
    const displayName = `withEventBroker(${componentName})`;
    const LoggedComponent = React.forwardRef((props, ref) => {
        const decoratedHandlers = eventTypes.reduce((handlers, eventType) => {
            const originalHandler = props[eventType];
            return {
                ...handlers,
                [eventType]: (event) => {
                    event_broker_1.eventBroker.publish({
                        eventId: eventType.replace(/^on/, '').toLowerCase(),
                        domEvent: event,
                        ...eventBrokerData,
                    });
                    return originalHandler && originalHandler(event);
                },
            };
        }, {});
        return (0, jsx_runtime_1.jsx)(Component, { ...props, ...decoratedHandlers, ref: ref });
    });
    LoggedComponent.displayName = displayName;
    return LoggedComponent;
}
//# sourceMappingURL=withEventBrokerDomHandlers.js.map
