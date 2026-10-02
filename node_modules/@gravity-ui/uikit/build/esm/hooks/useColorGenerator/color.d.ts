import type { ColorDetails, GenerateColorProps } from "./types.js";
export declare const linearToSrgb: (channel: number) => number;
export declare const oklchToRgb: (l: number, c: number, h: number) => [number, number, number];
export declare const generateColor: ({ seed, theme }: GenerateColorProps) => ColorDetails;
export declare const generateCustomColor: ({ seed, lightnessRange, chromaRange, }: {
    seed: string;
    lightnessRange: [number, number];
    chromaRange: [number, number];
}) => ColorDetails;
