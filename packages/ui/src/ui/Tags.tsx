import {Translation}    from "@use-pico/i18n";
import {type TagSchema} from "@use-pico/schema";
import {type FC}        from "react";
import {Badge}          from "./Badge";

export namespace Tags {
    export interface Props {
        tags?: TagSchema.Type[];

        onClick?(tag: TagSchema.Type): void;
    }
}

export const Tags: FC<Tags.Props> = (
    {
        tags = [],
        onClick,
    }
) => {
    return <>
        {tags.sort((a, b) => (a.sort || 0) - (b.sort || 0)).map(tag => <Badge
            key={tag.id}
            onClick={() => onClick?.(tag)}
        >
            <Translation label={tag.group} withLabel={tag.label}/>
        </Badge>)}
    </>;
};
