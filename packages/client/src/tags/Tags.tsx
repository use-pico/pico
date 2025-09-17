import type { EntitySchema } from "@use-pico/common";
import type { FC, ReactNode, Ref } from "react";
import { Badge } from "../badge/Badge";
import { Tx } from "../tx/Tx";

export namespace Tags {
	export interface Data extends EntitySchema.Type {
		label: string;
		sort: number;
	}

	export namespace Render {
		export interface Props {
			tag: Data;
		}

		export type Component = FC<Props>;
	}

	export interface Props {
		ref?: Ref<HTMLDivElement>;
		tags?: (Data | undefined | null)[];
		render?: Render.Component;
		onClick?: (tag: Data) => void;
		textEmpty?: ReactNode;
	}
}

export const Tags: FC<Tags.Props> = ({
	ref,
	tags = [],
	render: Render = ({ tag }) => tag.label,
	onClick,
	textEmpty,
}) => {
	const $tags = (tags.filter(Boolean) as Tags.Data[]).sort(
		(a, b) => a.sort - b.sort,
	);

	return (
		<div
			ref={ref}
			data-ui="Tags-root"
			className={"flex flex-wrap flex-row gap-2 items-center"}
		>
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
