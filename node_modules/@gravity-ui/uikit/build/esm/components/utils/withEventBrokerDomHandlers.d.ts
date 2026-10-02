import * as React from 'react';
import type { EventBrokerData } from "./event-broker/index.js";
type SupportedEvents = 'onClick' | 'onClickCapture';
export declare function withEventBrokerDomHandlers<T extends Partial<{
    [k in SupportedEvents]: React.EventHandler<React.SyntheticEvent>;
}>>(Component: React.ComponentType<React.PropsWithoutRef<T>>, eventTypes: Array<SupportedEvents>, eventBrokerData: Omit<EventBrokerData, 'eventId'>): React.ForwardRefExoticComponent<React.PropsWithoutRef<T> & React.RefAttributes<HTMLElement>>;
export {};
