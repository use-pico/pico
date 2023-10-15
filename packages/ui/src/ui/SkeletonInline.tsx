import {
    type ComponentProps,
    type FC
}                 from "react";
import {Skeleton} from "./Skeleton";

export interface ISkeletonInlineProps extends ComponentProps<typeof Skeleton> {
}

export const SkeletonInline: FC<ISkeletonInlineProps> = props => {
    return <Skeleton
        height={24}
        width={128}
        {...props}
    />;
};
