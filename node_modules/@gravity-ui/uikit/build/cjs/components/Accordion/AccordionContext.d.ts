import type { AccordionProps, AccordionValue } from "./types.js";
interface AccordionProviderProps<Multiple extends boolean> extends Required<Omit<AccordionProps<Multiple>, 'qa' | 'className' | 'value' | 'defaultValue' | 'multiple' | 'ariaLabel'>> {
    multiple: Multiple;
    value: AccordionValue<Multiple>;
    defaultValue: AccordionValue<Multiple>;
    onUpdate: (value: AccordionValue<Multiple>) => void;
}
interface AccordionSummaryRef {
    element: HTMLButtonElement;
    disabled: boolean;
}
type AccordionItemValue = string;
export declare function AccordionProvider<Multiple extends boolean>(props: AccordionProviderProps<Multiple>): import("react/jsx-runtime").JSX.Element;
export declare function useAccordion(): Required<Omit<AccordionProps<boolean>, "value" | "onUpdate" | "defaultValue" | "className" | "children" | "ariaLabel" | "qa"> & {
    items: AccordionValue<boolean>;
    updateItems: (value: AccordionItemValue) => void;
    registerSummary: (id: string, ref: AccordionSummaryRef) => void;
    unregisterSummary: (id: string) => void;
    getSummaryRefs: () => AccordionSummaryRef[];
}>;
export {};
