import * as React from 'react';
export type UseFileInputProps = {
    onUpdate?: (files: File[]) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export type UseFileInputResult = {
    controlProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    triggerProps: {
        onClick: () => void;
    };
};
/**
 * Used to shape props for input with type "file".
 *
 * Usage example:
 ```tsx
    import * as React from 'react';
    import {Button, useFileInput} from '@gravity-ui/uikit';
 
    const Component = () => {
        const onUpdate = React.useCallback((files: File[]) => console.log(files), []);
        const {controlProps, triggerProps} = useFileInput({onUpdate});
 
        return (
            <React.Fragment>
                <input {...controlProps} />
                <Button {...triggerProps}>Upload</Button>
            </React.Fragment>
        );
    };
```
 */
export declare function useFileInput({ onUpdate, onChange }: UseFileInputProps): UseFileInputResult;
