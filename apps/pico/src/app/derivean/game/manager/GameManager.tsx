import { Cursor, Fulltext, Tx, type withListCount } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ConstructionCard } from "~/app/derivean/game/manager/GameManager/ConstructionCard";
import type { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import type { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";
import type { withBlueprintUpgradeGraph } from "~/app/derivean/utils/withBlueprintUpgradeGraph";

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
		requirements: (BlueprintRequirementSchema["~entity"] & {
			name: string;
		})[];
		dependencies: (BlueprintDependencySchema["~entity"] & {
			name: string;
		})[];
	}

	export interface Props {
		data: withListCount.Result<Data>;
		userId: string;
		dependencies: withBlueprintGraph.Result;
		upgrades: withBlueprintUpgradeGraph.Result;
		inventory: InventorySchema["~entity-array"];
		buildingCounts: BuildingCount[];
		fulltext: Pick<Fulltext.Props, "value" | "onFulltext">;
		cursor: Pick<Cursor.Props, "cursor" | "onPage" | "onSize">;
	}
}

export const GameManager: FC<GameManager.Props> = ({
	data,
	userId,
	dependencies,
	upgrades,
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
							dependencies={dependencies}
							upgrades={upgrades}
							inventory={inventory}
							buildingCounts={buildingCounts}
						/>
					);
				})}
			</div>
		</div>
	);
};
