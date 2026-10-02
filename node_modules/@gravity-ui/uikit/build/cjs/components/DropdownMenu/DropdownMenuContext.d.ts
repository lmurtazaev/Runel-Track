import * as React from 'react';
interface Context<T> {
    toggle(open?: boolean): void;
    data: T | undefined;
}
export declare const DropdownMenuContext: React.Context<Context<unknown>>;
export {};
