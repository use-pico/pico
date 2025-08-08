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
	const classes = tva.create(cls);

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
						cls={{
							slot: {
								base: {
									class: [
										// TODO Enable support for proxy() instead of string
										tva.create(undefined, {
											variant: {
												type: entity.type,
											},
										}).item,
									],
								},
							},
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

