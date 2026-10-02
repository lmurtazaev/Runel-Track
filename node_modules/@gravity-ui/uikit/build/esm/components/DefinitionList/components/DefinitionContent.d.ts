import type { DefinitionListItemProps } from "../types.js";
interface DefinitionProps extends Pick<DefinitionListItemProps, 'copyText' | 'children'> {
}
export declare function DefinitionContent({ copyText, children }: DefinitionProps): string | number | boolean | Iterable<import("react").ReactNode> | import("react/jsx-runtime").JSX.Element;
export {};
