declare const _default: ((key: "close", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "close", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "close", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        Modal: Record<"close", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
