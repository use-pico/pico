import { useCls } from "@use-pico/cls";
import { type IssueSchema, withIssueType } from "@use-pico/common";
import type { FC } from "react";
import { Badge } from "../badge/Badge";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Icon } from "../icon/Icon";
import { InfoIcon } from "../icon/InfoIcon";
import { WarningIcon } from "../icon/WarningIcon";
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
	cls = IssuesCls,
	tweak,
	...props
}) => {
	const { slots } = useCls(cls, [
		tweak,
	]);

	const icons: Record<IssueSchema.Type["type"], string> = {
		error: ErrorIcon,
		warning: WarningIcon,
		info: InfoIcon,
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
						data-ui="Issues-item"
						tweak={{
							slot: {
								root: {
									class: slots.item({
										variant: {
											type: entity.type,
										},
									}),
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
