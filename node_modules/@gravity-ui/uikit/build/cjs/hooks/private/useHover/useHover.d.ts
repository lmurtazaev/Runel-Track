import * as React from 'react';
export type UseHoverResult<T> = [React.MouseEventHandler<T>, React.MouseEventHandler<T>, boolean];
export declare function useHover<T = Element>(): UseHoverResult<T>;
