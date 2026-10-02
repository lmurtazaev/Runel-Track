import * as React from 'react';
export declare function usePopupVisibility(visible?: boolean, onChangeVisibility?: React.Dispatch<React.SetStateAction<boolean>> | ((visible: boolean) => void), disabled?: boolean): {
    isPopupShown: boolean;
    togglePopup: (open?: boolean) => void;
    closePopup: () => void;
};
