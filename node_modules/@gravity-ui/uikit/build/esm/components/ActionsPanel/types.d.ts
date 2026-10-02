import type { ButtonProps } from "../Button/index.js";
import type { DropdownMenuItem } from "../DropdownMenu/index.js";
import type { QAProps } from "../types.js";
export interface ActionsPanelItem {
    /** Uniq action id */
    id: string;
    /** If true, then always inside the dropdown */
    collapsed?: boolean;
    /** Settings for dropdown action */
    dropdown: {
        item: DropdownMenuItem;
        group?: string;
    };
    /** Settings for button action */
    button: {
        props: ButtonProps;
    };
}
export interface ActionsPanelProps extends QAProps {
    /** Array of actions ActionsPanelItem[] */
    actions: ActionsPanelItem[];
    /** ClassName of element */
    className?: string;
    /** Close button click handler */
    onClose?: () => void;
    /** Render-prop for displaying the content of a note */
    renderNote?: () => React.ReactNode;
    /** ClassName of note */
    noteClassName?: string;
    /** Maximum number of actions in a row */
    maxRowActions?: number;
}
