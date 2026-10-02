export declare const i18n: ((key: "label_show-password" | "label_hide-password", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "label_show-password" | "label_hide-password", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "label_show-password" | "label_hide-password", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        PasswordInput: Record<"label_show-password" | "label_hide-password", import("@gravity-ui/i18n").KeyData>;
    };
};
