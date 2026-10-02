import type { DistributiveOmit } from "../../../utils/types.js";
import type { AriaLabelingProps, DOMProps, QAProps } from "../../types.js";
import type { AvatarIconProps } from "../AvatarIcon/index.js";
import type { AvatarImageProps } from "../AvatarImage/index.js";
import type { AvatarTextProps } from "../AvatarText/index.js";
import type { AvatarCommonProps, AvatarSize } from "./common.js";
export type AvatarTheme = 'normal' | 'brand';
export type AvatarView = 'filled' | 'outlined';
export type AvatarShape = 'square' | 'circle';
interface AvatarBaseProps extends AriaLabelingProps, DOMProps, QAProps {
    size?: AvatarSize;
    theme?: AvatarTheme;
    view?: AvatarView;
    shape?: AvatarShape;
    backgroundColor?: string;
    borderColor?: string;
    title?: string;
}
export type AvatarProps = AvatarBaseProps & DistributiveOmit<AvatarImageProps | AvatarIconProps | AvatarTextProps, keyof AvatarCommonProps>;
export {};
