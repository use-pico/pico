import { Progress, Tx } from "@use-pico/client";
import { tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { Header } from "~/app/derivean/game/manager/GameManager/BuildingItem/Header";
import { ProductionLine } from "~/app/derivean/game/manager/GameManager/ProductionLine";
import { RequirementsInline } from "~/app/derivean/game/RequirementsInline";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";

export namespace BuildingItem {
	export interface Props extends Entity.Type<MapSchema.Type> {
		userId: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const BuildingItem: FC<BuildingItem.Props> = ({
	entity,
	userId,
	inventory,
}) => {
	const canBuild =
		entity.withAvailableBuildings && entity.withAvailableResources;

	const isBuilt = Boolean(entity.building);

	/**
	 * In general, current game rules allows only one construction at a time.
	 */
	const queue = entity.construction?.[0];

	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
				"border-slate-300",
				"rounded-lg",
				"p-2",
				"px-4",
				"border",
				!isBuilt && entity.withAvailableBuildings ? ["border-purple-600"] : [],
				canBuild ? ["border-green-600"] : [],
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
				<div className={"flex flex-row items-center gap-4"}>
					<Header
						name={entity.name}
						userId={userId}
						blueprintId={entity.id}
						isBuilt={isBuilt}
						canBuild={canBuild}
					/>
				</div>
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
			{isBuilt ?
				<>
					<div
						className={tvc([
							"flex",
							"flex-col",
							"gap-2",
							entity.production.length > 0 ?
								["border-t", "border-slate-300", "pt-4"]
							:	undefined,
						])}
					>
						{entity.production.map((production) => {
							return (
								<ProductionLine
									key={`production-${production.id}-${production.blueprintId}`}
									entity={entity}
									userId={userId}
									production={production}
									inventory={inventory}
								/>
							);
						})}
					</div>
				</>
			:	null}
		</div>
	);
};
