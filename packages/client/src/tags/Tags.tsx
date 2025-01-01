import { TagSchema } from "@use-pico/common";
import { type FC, type ReactNode } from "react";
import { Tx } from "../tx/Tx";
import { Badge } from "../badge/Badge";

export namespace Tags {
	export interface Props {
		tags?: (TagSchema.Type | undefined | null)[];
		render?: FC<{
			tag: TagSchema.Type;
		}>;
		onClick?: (tag: TagSchema.Type) => void;
		textEmpty?: ReactNode;
	}
}

export const Tags: FC<Tags.Props> = ({ tags = [], render = ({ tag }) => tag.label, onClick, textEmpty }) => {
	const $tags = (tags.filter(Boolean) as TagSchema.Type[]).sort((a, b) => (a.sort || 0) - (b.sort || 0));
	return (
		<>
			{$tags.length
				? $tags.map((tag) => (
						<Badge
							key={tag.id}
							onClick={() => onClick?.(tag)}>
							{render({ tag })}
						</Badge>
					))
				: textEmpty || <Tx label={"No tags (label)"} />}
		</>
	);
};
