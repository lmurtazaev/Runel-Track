import type { DefinitionListDirection, DefinitionListItemProps } from "../types.js";
interface TermProps extends Pick<DefinitionListItemProps, 'note' | 'name'> {
    direction?: DefinitionListDirection;
}
export declare function TermContent({ note, name, direction }: TermProps): import("react/jsx-runtime").JSX.Element;
export {};
