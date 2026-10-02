'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { eventBroker } from "./event-broker/index.js";
import { getComponentName } from "./getComponentName.js";
export function withEventBrokerDomHandlers(Component, eventTypes, eventBrokerData) {
    const componentName = getComponentName(Component);
    const displayName = `withEventBroker(${componentName})`;
    const LoggedComponent = React.forwardRef((props, ref) => {
        const decoratedHandlers = eventTypes.reduce((handlers, eventType) => {
            const originalHandler = props[eventType];
            return {
                ...handlers,
                [eventType]: (event) => {
                    eventBroker.publish({
                        eventId: eventType.replace(/^on/, '').toLowerCase(),
                        domEvent: event,
                        ...eventBrokerData,
                    });
                    return originalHandler && originalHandler(event);
                },
            };
        }, {});
        return _jsx(Component, { ...props, ...decoratedHandlers, ref: ref });
    });
    LoggedComponent.displayName = displayName;
    return LoggedComponent;
}
//# sourceMappingURL=withEventBrokerDomHandlers.js.map
