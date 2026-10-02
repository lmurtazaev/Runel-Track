import type { BaseInputControlProps, InputControlState } from "./types.js";
export declare const CONTROL_ERROR_MESSAGE_QA = "control-error-message-qa";
export declare const CONTROL_ERROR_ICON_QA = "control-error-icon-qa";
export declare const prepareAutoComplete: (autoComplete: BaseInputControlProps["autoComplete"]) => string | undefined;
export declare const getInputControlState: (validationStateProp: BaseInputControlProps["validationState"]) => InputControlState | undefined;
export declare const errorPropsMapper: (errorProps: Pick<BaseInputControlProps, "error" | "errorMessage" | "errorPlacement" | "validationState">) => {
    errorMessage: import("react").ReactNode;
    errorPlacement: "inside" | "outside" | undefined;
    validationState: "invalid" | undefined;
};
