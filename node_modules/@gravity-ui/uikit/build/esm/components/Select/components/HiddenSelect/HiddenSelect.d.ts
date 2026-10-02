interface HiddenSelectProps {
    name?: string;
    value: string[];
    disabled?: boolean;
    form?: string;
    onReset: (value: string[]) => void;
}
export declare function HiddenSelect(props: HiddenSelectProps): import("react/jsx-runtime").JSX.Element | null;
export {};
