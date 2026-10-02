import type * as React from 'react';
import type { ThemeContextProps } from "./types.js";
export interface WithDirectionProps extends Pick<ThemeContextProps, 'direction'> {
}
export declare function withDirection<T extends WithDirectionProps>(WrappedComponent: React.ComponentType<T>): React.ComponentType<Omit<T, keyof WithDirectionProps>>;
