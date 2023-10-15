import {
    type ComponentProps,
    type FC
}                 from "react";
import {Skeleton} from "./Skeleton";

export interface ISkeletonMenuProps extends ComponentProps<typeof Skeleton> {
}

export const SkeletonMenu: FC<ISkeletonMenuProps> = props => {
    return <Skeleton
        height={24}
        width={512}
        {...props}
    />;
};
