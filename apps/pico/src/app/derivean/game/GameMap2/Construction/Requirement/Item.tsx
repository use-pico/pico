import { useParams } from "@tanstack/react-router";
import { Icon, LinkTo, Progress } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { RequirementPanel } from "~/app/derivean/game/GameMap2/Construction/Requirement/RequirementPanel";
import { ArrowRightIcon } from "~/app/derivean/icon/ArrowRightIcon";
import { DemandIcon } from "~/app/derivean/icon/DemandIcon";
import { PackageIcon } from "~/app/derivean/icon/PackageIcon";

export namespace Item {
	export interface Props {
		requirement: RequirementPanel.Requirement;
	}
}

export const Item: FC<Item.Props> = ({ requirement }) => {
	const { locale, mapId } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});
	const available = requirement.available || 0;

	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
				"rounded-md",
				"border",
				"border-slate-300",
				"p-2",
				"cursor-default",
				"hover:bg-slate-100",
				requirement.supply ?
					[
						"bg-purple-50",
						"border-purple-400",
						"hover:bg-purple-50",
						"hover:border-purple-400",
					]
				:	[
						"bg-amber-50",
						"border-amber-400",
						"hover:bg-amber-50",
						"hover:border-amber-400",
					],
			])}
		>
			<div className={"flex flex-row items-center justify-between"}>
				<div
					className={tvc([
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						requirement.supply ? ["text-purple-600"] : ["text-slate-900"],
					])}
				>
					{requirement.supply ?
						<Icon icon={DemandIcon} />
					:	<Icon icon={PackageIcon} />}
					{requirement.supply ?
						<div className={"flex flex-row gap-2 items-center"}>
							<LinkTo
								to={
									"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"
								}
								params={{
									locale,
									mapId,
									buildingId: requirement.supply.buildingId,
								}}
							>
								{requirement.supply.name}
							</LinkTo>
							<Icon icon={ArrowRightIcon} />
						</div>
					:	null}
					<div className={"font-bold"}>{requirement.name}</div>
				</div>

				<div className={"flex flex-row gap-1 items-center"}>
					<div>{toHumanNumber({ number: available })}</div>
					<div>/</div>
					<div className={"font-bold"}>
						{toHumanNumber({ number: requirement.amount })}
					</div>
				</div>
			</div>

			<Progress value={(100 * available) / requirement.amount} />
		</div>
	);
};
