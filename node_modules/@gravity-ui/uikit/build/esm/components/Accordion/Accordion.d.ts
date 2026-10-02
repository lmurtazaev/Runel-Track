import * as React from 'react';
import { AccordionItem } from "./AccordionItem/AccordionItem.js";
import { AccordionSummary } from "./AccordionSummary/AccordionSummary.js";
import type { AccordionProps } from "./types.js";
import "./Accordion.css";
export declare const Accordion: (<Multiple extends boolean = false>(props: AccordionProps<Multiple> & {
    ref?: React.Ref<HTMLDivElement>;
}) => React.ReactElement) & {
    Item: typeof AccordionItem;
    Summary: typeof AccordionSummary;
    displayName: string;
};
