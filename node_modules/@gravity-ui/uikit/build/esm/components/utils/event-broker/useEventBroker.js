'use client';
import * as React from 'react';
import { eventBroker } from "./EventBroker.js";
export function useEventBroker(subscription, broker = eventBroker) {
    React.useEffect(() => {
        broker.subscribe(subscription);
        return () => broker.unsubscribe(subscription);
    }, [broker, subscription]);
}
//# sourceMappingURL=useEventBroker.js.map
