import { Progress, Tx } from "@use-pico/client";
import { tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import { Dependencies } from "~/app/derivean/game/Dependencies";
import type { GameManager } from "~/app/derivean/game/manager/GameManager";
import { Header } from "~/app/derivean/game/manager/GameManager/BuildingItem/Header";
import { ProductionLine } from "~/app/derivean/game/manager/GameManager/ProductionLine";
import { RequirementsInline } from "~/app/derivean/game/RequirementsInline";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";
import type { withBlueprintUpgradeGraph } from "~/app/derivean/utils/withBlueprintUpgradeGraph";

export namespace BuildingItem {
	export interface Props extends Entity.Type<GameManager.Data> {
		userId: string;
		dependencies: withBlueprintGraph.Result;
		upgrades: withBlueprintUpgradeGraph.Result;
		inventory: InventorySchema["~entity-array"];
		buildingCounts: GameManager.BuildingCount[];
	}
}

export const BuildingItem: FC<BuildingItem.Props> = ({
	entity,
	userId,
	dependencies,
	upgrades,
	inventory,
	buildingCounts,
}) => {
	const canBuild =
		entity.withAvailableBuildings && entity.withAvailableResources;

	const isBuilt =
		(buildingCounts.find((item) => item.blueprintId === entity.id)?.count ||
			0) > 0;

	/**
	 * In general, current game rules allows only one construction at a time.
	 */
	const queue = entity.construction?.[0];

	const isProductionLimit =
		entity.production.reduce(
			(sum, production) => sum + production.queue.length,
			0,
		) >= entity.productionLimit;

	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
				"border-slate-300",
				"rounded-lg",
				"p-4",
				"pt-2",
				"border-2",
				entity.withAvailableBuildings ?
					["border-amber-200", "hover:border-amber-400"]
				:	[],
				canBuild ? ["border-emerald-200", "hover:border-emerald-400"] : [],
				isBuilt ? ["border-purple-200", "hover:border-purple-400"] : [],
			])}
		>
			<div
				className={tvc([
					"flex",
					"flex-row",
					"gap-2",
					"justify-between",
					"py-2",
				])}
			>
				<Header
					name={entity.name}
					userId={userId}
					blueprintId={entity.id}
					isBuilt={isBuilt}
					canBuild={canBuild}
					upgrades={upgrades}
				/>
				{isBuilt || queue ? null : (
					<div className={"flex flex-row gap-4 items-center"}>
						<RequirementsInline
							textTitle={<Tx label={"Building requirements (title)"} />}
							textEmpty={<Tx label={"No requirements (label)"} />}
							requirements={entity.requirements}
							diff={inventory}
						/>
						<CyclesInline cycles={entity.cycles} />
					</div>
				)}
			</div>
			{queue ?
				<Progress
					variant={{ size: "md" }}
					value={(100 * queue.cycle) / (queue.to - queue.from)}
				/>
			:	null}
			{isBuilt || queue ? null : (
				<Dependencies
					graph={dependencies}
					blueprintId={entity.id}
					buildingCounts={buildingCounts}
				/>
			)}
			{isBuilt ?
				<>
					<div
						className={tvc([
							"flex",
							"flex-col",
							"gap-2",
							"border-t",
							"border-slate-300",
							"pt-4",
						])}
					>
						{entity.production.map((production) => {
							return (
								<ProductionLine
									key={`production-${production.id}-${production.blueprintId}`}
									userId={userId}
									production={production}
									inventory={inventory}
									isProductionLimit={isProductionLimit}
								/>
							);
						})}
					</div>
				</>
			:	null}
		</div>
	);
};
