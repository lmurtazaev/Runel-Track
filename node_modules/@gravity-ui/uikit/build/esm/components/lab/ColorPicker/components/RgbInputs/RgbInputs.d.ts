import type { HsvaColor } from '@uiw/react-color';
type RgbInputsProps = {
    hsva: HsvaColor;
    withAlpha: boolean;
    onChange: (color: any) => void;
};
export declare const RgbInputs: ({ hsva, withAlpha, onChange }: RgbInputsProps) => import("react/jsx-runtime").JSX.Element;
export {};
