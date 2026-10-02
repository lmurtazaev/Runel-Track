import type * as React from 'react';
export declare function withToaster<T>(): (WrappedComponent: React.ComponentType<T>) => {
    (props: T): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
