import { Fulltext } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ConstructionCard } from "~/app/derivean/game/building/Building_Construction_List/ConstructionCard";
import type { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import type { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";
import type { Inventory_Schema } from "~/app/derivean/schema/inventory/Inventory_Schema";
import type { withBuildingGraph } from "~/app/derivean/utils/withBuildingGraph";

export namespace Building_Construction_List {
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
		data: Data[];
		userId: string;
		graph: withBuildingGraph.Result;
		inventory: Inventory_Schema["~entity-array"];
		buildingCounts: BuildingCount[];
		fulltext: Pick<Fulltext.Props, "value" | "onFulltext">;
	}
}

export const Building_Construction_List: FC<
	Building_Construction_List.Props
> = ({ data, userId, graph, inventory, buildingCounts, fulltext }) => {
	return (
		<div className={"flex flex-col gap-2"}>
			<Fulltext {...fulltext} />
			<div className={"grid grid-cols-1 gap-4"}>
				{data.map((item) => {
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
