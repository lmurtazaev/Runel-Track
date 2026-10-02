import type { IconData } from "../../Icon/index.js";
import type { AvatarCommonProps } from "../types/common.js";
export interface AvatarIconProps extends AvatarCommonProps {
    icon: IconData;
    color?: string;
}
