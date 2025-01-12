import { Cursor, Fulltext, Tx, type withListCount } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ConstructionCard } from "~/app/derivean/game/manager/GameManager/ConstructionCard";
import type { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/BlueprintDependencySchema";
import type { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import type { Inventory_Schema } from "~/app/derivean/schema/InventorySchema";

export namespace GameManager {
	export interface BuildingCount {
		buildingBaseId: string;
		count: number;
		name: string;
	}

	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		withAvailableBuildings: boolean;
		withAvailableResources: boolean;
		requiredResources: (Building_Base_Resource_Requirement_Schema["~entity"] & {
			name: string;
		})[];
		requiredBuildings: (Building_Base_Building_Base_Requirement_Schema["~entity"] & {
			name: string;
		})[];
	}

	export interface Props {
		data: withListCount.Result<Data>;
		userId: string;
		graph: withBuildingGraph.Result;
		inventory: Inventory_Schema["~entity-array"];
		buildingCounts: BuildingCount[];
		fulltext: Pick<Fulltext.Props, "value" | "onFulltext">;
		cursor: Pick<Cursor.Props, "cursor" | "onPage" | "onSize">;
	}
}

export const GameManager: FC<GameManager.Props> = ({
	data,
	userId,
	graph,
	inventory,
	buildingCounts,
	fulltext,
	cursor,
}) => {
	return (
		<div className={"flex flex-col gap-2"}>
			<Fulltext {...fulltext} />
			<Cursor
				count={data.count}
				textTotal={<Tx label={"Count of buildings"} />}
				{...cursor}
			/>
			<div className={"grid grid-cols-1 gap-4"}>
				{data.data.map((item) => {
					return (
						<ConstructionCard
							key={item.id}
							entity={item}
							userId={userId}
							graph={graph}
							inventory={inventory}
							buildingCounts={buildingCounts}
						/>
					);
				})}
			</div>
		</div>
	);
};
