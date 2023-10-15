import {type FC}  from "react";
import {Skeleton} from "./Skeleton";

export interface ISkeletonBlockProps {
    lines?: number;
    height?: number;
}

export const SkeletonBlock: FC<ISkeletonBlockProps> = (
    {
        lines = 3,
        height = 12,
    }) => {
    return <>
        {Array.from({length: lines}, (_, line) => <Skeleton
            key={`skeleton-${line}`}
            height={height}
            width={line === (lines - 1) ? "80%" : undefined}
            mt={6}
        />)}
    </>;
};
