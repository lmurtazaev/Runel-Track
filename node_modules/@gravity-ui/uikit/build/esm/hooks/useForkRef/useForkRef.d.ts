import * as React from 'react';
export type UseForkRefProps<K> = Array<React.Ref<K> | undefined>;
export type UseForkRefResult<W> = React.RefCallback<W> | null;
export declare function useForkRef<T>(...refs: UseForkRefProps<T>): UseForkRefResult<T>;
