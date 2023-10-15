import {
    type ComponentProps,
    type FC
}                 from "react";
import {Skeleton} from "./Skeleton";

export interface ISkeletonButtonsProps extends ComponentProps<typeof Skeleton> {
}

export const SkeletonButtons: FC<ISkeletonButtonsProps> = props => {
    return <Skeleton
        height={24}
        width={256}
        {...props}
    />;
};
