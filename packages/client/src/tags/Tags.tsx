import type { IdentitySchema } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { Badge } from "../badge/Badge";
import { Tx } from "../tx/Tx";

export namespace Tags {
	export interface Data extends IdentitySchema.Type {
		label: string;
		sort: number;
	}

	export interface Props {
		tags?: (Data | undefined | null)[];
		render?: FC<{
			tag: Data;
		}>;
		onClick?: (tag: Data) => void;
		textEmpty?: ReactNode;
	}
}

export const Tags: FC<Tags.Props> = ({
	tags = [],
	render: Render = ({ tag }) => tag.label,
	onClick,
	textEmpty,
}) => {
	const $tags = (tags.filter(Boolean) as Tags.Data[]).sort(
		(a, b) => a.sort - b.sort,
	);

	return (
		<div className={"flex flex-wrap flex-row gap-2 items-center"}>
			{$tags.length
				? $tags.map((tag) => (
						<Badge
							key={tag.id}
							onClick={() => onClick?.(tag)}
						>
							<Render tag={tag} />
						</Badge>
					))
				: textEmpty || <Tx label={"No tags (label)"} />}
		</div>
	);
};
