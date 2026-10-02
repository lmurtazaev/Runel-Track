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
export declare class EventEmitter<T extends Record<string, unknown[]>> {
    private listeners;
    constructor();
    destroy(): void;
    subscribe<Event extends keyof T>(event: Event, listener: (...args: T[Event]) => void): () => void;
    notify<Event extends keyof T>(event: Event, data: T[Event]): boolean;
}
