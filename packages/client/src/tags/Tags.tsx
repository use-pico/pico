import { TagSchema } from "@use-pico/common";
import { type FC, type ReactNode } from "react";
import { Badge } from "../badge/Badge";
import { Tx } from "../tx/Tx";

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

export const Tags: FC<Tags.Props> = ({
	tags = [],
	render: Render = ({ tag }) => tag.label,
	onClick,
	textEmpty,
}) => {
	const $tags = (tags.filter(Boolean) as TagSchema.Type[]).sort(
		(a, b) => a.sort - b.sort,
	);

	return (
		<div className={"flex flex-wrap flex-row gap-2 items-center"}>
			{$tags.length ?
				$tags.map((tag) => (
					<Badge
						key={tag.id}
						onClick={() => onClick?.(tag)}
					>
						<Render tag={tag} />
					</Badge>
				))
			:	textEmpty || <Tx label={"No tags (label)"} />}
		</div>
	);
};
