import * as React from 'react';
import type { MobileContextProps } from "./MobileContext.js";
export interface WithMobileProps extends MobileContextProps {
}
export declare function withMobile<T extends WithMobileProps>(WrappedComponent: React.ComponentType<T>): React.ComponentType<Omit<T, keyof WithMobileProps>>;
