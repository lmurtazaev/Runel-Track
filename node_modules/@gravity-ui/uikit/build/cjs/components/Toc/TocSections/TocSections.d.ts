import type { TocItem as TocItemType } from "../types.js";
import "./TocSections.css";
export interface TocSectionsProps {
    items: TocItemType[];
    value?: string;
    onUpdate?: (value: string) => void;
    depth?: number;
    childItem?: boolean;
    onItemClick?: (event: React.MouseEvent) => void;
}
export declare function TocSections(props: TocSectionsProps): import("react/jsx-runtime").JSX.Element | null;
