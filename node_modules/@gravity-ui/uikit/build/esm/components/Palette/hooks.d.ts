export interface PaletteGridProps {
    disabled?: boolean;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    whenFocused?: {
        selectItem: () => void;
        nextItem: () => void;
        previousItem: () => void;
        nextRow: () => void;
        previousRow: () => void;
    };
}
export declare function usePaletteGrid(props: PaletteGridProps): React.HTMLAttributes<HTMLElement>;
