import * as React from 'react';
import type { DefinitionListProps } from "../types.js";
interface DefinitionListProviderProps extends Pick<DefinitionListProps, 'direction' | 'contentMaxWidth' | 'nameMaxWidth'> {
    children?: React.ReactNode;
}
export declare const DefinitionListAttributesContext: React.Context<(Pick<DefinitionListProps, "direction"> & {
    keyStyle?: React.CSSProperties;
    valueStyle?: React.CSSProperties;
}) | undefined>;
export declare function DefinitionListProvider({ direction, contentMaxWidth, nameMaxWidth, children, }: DefinitionListProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useDefinitionListAttributes(): Pick<DefinitionListProps, "direction"> & {
    keyStyle?: React.CSSProperties;
    valueStyle?: React.CSSProperties;
};
export {};
