import { useCls } from "@use-pico/cls";
import { type IssueSchema, withIssueType } from "@use-pico/common";
import type { FC } from "react";
import { Badge } from "../badge/Badge";
import { Icon } from "../icon/Icon";
import { More } from "../more/More";
import { Tx } from "../tx/Tx";
import { IssuesCls } from "./IssuesCls";

export namespace Issues {
	export interface Props
		extends IssuesCls.Props<
			Omit<More.Props<IssueSchema.Type>, "renderInline">
		> {
		//
	}
}

export const Issues: FC<Issues.Props> = ({
	tva = IssuesCls,
	cls,
	...props
}) => {
	const slots = useCls(tva, cls);

	const icons: Record<IssueSchema.Type["type"], string> = {
		error: "icon-[ix--warning]",
		warning: "icon-[ix--warning]",
		info: "icon-[ix--info]",
	};

	const isErrorWarning = withIssueType({
		issues: props.items,
		types: [
			"error",
			"warning",
		],
	});
	const isInfo = withIssueType({
		issues: props.items,
		types: [
			"info",
		],
	});

	return (
		<More<IssueSchema.Type>
			limit={0}
			icon={
				isErrorWarning
					? "icon-[ix--warning]"
					: isInfo
						? "icon-[ix--info]"
						: "icon-[ix--info]"
			}
			renderInline={({ entity }) => {
				return (
					<Badge
						key={`issues-${entity.id}-inline`}
						cls={({ what }) => ({
							slot: what.slot({
								root: what.css(
									slots.item(({ what }) => ({
										variant: what.variant({
											type: entity.type,
										}),
									})),
								),
							}),
						})}
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
