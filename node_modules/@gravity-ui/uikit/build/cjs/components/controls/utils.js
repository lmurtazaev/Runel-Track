"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorPropsMapper = exports.getInputControlState = exports.prepareAutoComplete = exports.CONTROL_ERROR_ICON_QA = exports.CONTROL_ERROR_MESSAGE_QA = void 0;
exports.CONTROL_ERROR_MESSAGE_QA = 'control-error-message-qa';
exports.CONTROL_ERROR_ICON_QA = 'control-error-icon-qa';
const prepareAutoComplete = (autoComplete) => {
    if (typeof autoComplete === 'boolean') {
        return autoComplete ? 'on' : 'off';
    }
    else {
        return autoComplete;
    }
};
exports.prepareAutoComplete = prepareAutoComplete;
const getInputControlState = (validationStateProp) => {
    return validationStateProp === 'invalid' ? 'error' : undefined;
};
exports.getInputControlState = getInputControlState;
const errorPropsMapper = (errorProps) => {
    const { error: errorProp, errorMessage: errorMessageProp, errorPlacement, validationState: validationStateProp, } = errorProps;
    let errorMessage;
    if (typeof errorProp === 'string') {
        errorMessage = errorProp;
    }
    if (errorMessageProp) {
        errorMessage = errorMessageProp;
    }
    let validationState;
    if (validationStateProp === 'invalid' || Boolean(errorProp)) {
        validationState = 'invalid';
    }
    return { errorMessage, errorPlacement, validationState };
};
exports.errorPropsMapper = errorPropsMapper;
//# sourceMappingURL=utils.js.map
