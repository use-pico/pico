import type { cls, IssueSchema } from "@use-pico/common";
import type { FC } from "react";
import { Badge } from "../badge/Badge";
import { Icon } from "../icon/Icon";
import { More } from "../more/More";
import { Tx } from "../tx/Tx";
import { IssuesCls } from "./IssuesCls";

export namespace Issues {
	export interface Props
		extends cls.Clear<Omit<More.Props<IssueSchema.Type>, "render">>,
			IssuesCls.Props {
		//
	}
}

export const Issues: FC<Issues.Props> = ({
	variant,
	tva = IssuesCls,
	cls,
	...props
}) => {
	const { slots } = tva(variant, cls);

	const icons: Record<IssueSchema.Type["type"], string> = {
		error: "icon-[ix--warning]",
		warning: "icon-[ix--warning]",
		info: "icon-[ix--info]",
	};

	return (
		<More<IssueSchema.Type>
			limit={0}
			icon={"icon-[ix--warning]"}
			render={({ entity }) => {
				return (
					<Badge
						cls={{
							base: slots.item({
								type: entity.type,
							}),
						}}
					>
						<Icon icon={icons[entity.type]} />
						<Tx label={entity.message} />
					</Badge>
				);
			}}
			{...props}
		/>
	);
};
