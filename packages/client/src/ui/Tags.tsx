"use client";

import {TagSchema} from "@use-pico/common";
import {
    type FC,
    type ReactNode
}                  from "react";
import {t}         from "../i18n/t";

const DEFAULT_SORT = 0;

export namespace Tags {
    export interface Props {
        tags?: (TagSchema.Type | undefined | null)[];
        render?: FC<{
            tag: TagSchema.Type;
        }>;
        onClick?: (tag: TagSchema.Type) => void;
        text?: {
            empty?: ReactNode;
        };
    }
}

export const Tags: FC<Tags.Props> = (
    {
        tags = [],
        render = ({tag}) => tag.label,
        onClick,
        text,
    }
) => {
    const $tags = (tags.filter(Boolean) as TagSchema.Type[]).sort((a, b) => (a.sort || DEFAULT_SORT) - (b.sort || DEFAULT_SORT));
    return <>
        {$tags.length ? $tags.map(tag => <div
            key={tag.id}
            onClick={() => onClick?.(tag)}
        >
            {render({tag})}
        </div>) : text?.empty || t()`No tags`}
    </>;
};
