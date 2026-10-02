export declare const useContainerThemeProps: () => {
    getClosestMediaProps: <T>(medias?: import("../types.js").MediaPartial<T>) => T | undefined;
    containerThemeProps: {
        gutters?: import("../types.js").Space | undefined;
        spaceRow?: import("../types.js").Space | undefined;
    };
    breakpoints: import("../types.js").MediaProps<number>;
};
