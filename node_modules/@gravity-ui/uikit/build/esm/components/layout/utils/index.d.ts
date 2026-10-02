import type { ColSize, IsMediaActive, MediaPartial, MediaType, Space } from "../types.js";
export declare const isMediaActiveFactory: (activeType: MediaType) => IsMediaActive;
export declare const getClosestMediaPropsFactory: (currentActive: MediaType) => <T>(medias?: MediaPartial<T>) => T | undefined;
export declare const makeCssMod: (space: Space | ColSize) => string;
