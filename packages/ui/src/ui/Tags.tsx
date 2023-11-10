import {type TagSchema} from "@use-pico/schema";
import {
    type FC,
    type ReactNode
}                       from "react";
import {Badge}          from "./Badge";

export namespace Tags {
    export interface Props {
        tags?: TagSchema.Type[];

        render?(tag: TagSchema.Type): ReactNode;

        onClick?(tag: TagSchema.Type): void;
    }
}

export const Tags: FC<Tags.Props> = (
    {
        tags = [],
        render = tag => tag.label,
        onClick,
    }
) => {
    return <>
        {tags.sort((a, b) => (a.sort || 0) - (b.sort || 0)).map(tag => <Badge
            key={tag.id}
            onClick={() => onClick?.(tag)}
        >
            {render(tag)}
        </Badge>)}
    </>;
};
