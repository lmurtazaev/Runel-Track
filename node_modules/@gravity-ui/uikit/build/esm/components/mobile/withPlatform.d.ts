import * as React from 'react';
import type { MobileContextProps } from "./MobileContext.js";
export type WithPlatformProps = {
    platform: MobileContextProps['platform'];
};
export declare function withPlatform<T extends WithPlatformProps>(WrappedComponent: React.ComponentType<T>): React.ComponentType<Omit<T, keyof WithPlatformProps>>;
