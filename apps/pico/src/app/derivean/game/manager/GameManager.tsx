import { Cursor, Fulltext, Tx, type withListCount } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import { BuildingItem } from "~/app/derivean/game/manager/GameManager/BuildingItem";
import type { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import type { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";

export namespace GameManager {
	export interface BuildingCount {
		blueprintId: string;
		count: number;
		name: string;
	}

	export namespace Production {
		export interface Requirements {
			id: string;
			amount: number;
			passive: boolean;
			name: string;
			resourceId: string;
		}

		export interface Queue {
			id: string;
			blueprintProductionId: string;
			from: number;
			to: number;
			cycle: number;
		}
	}

	export interface Production {
		id: string;
		name: string;
		limit: number;
		cycles: number;
		amount: number;
		blueprintId: string;
		resourceId: string;
		buildingId?: string | null;
		requirements: Production.Requirements[];
		queue: Production.Queue[];
	}

	export interface Construction {
		id: string;
		from: number;
		to: number;
		cycle: number;
	}

	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		productionLimit: number;
		productionCount: number;
		withAvailableBuildings: boolean;
		withAvailableResources: boolean;
		requirements: (BlueprintRequirementSchema["~entity"] & {
			name: string;
		})[];
		dependencies: (BlueprintDependencySchema["~entity"] & {
			name: string;
		})[];
		production: Production[];
		construction: Construction[];
	}

	export interface Props {
		data: withListCount.Result<Data>;
		userId: string;
		cycle: number;
		dependencies: withBlueprintGraph.Result;
		inventory: InventorySchema["~entity-array"];
		buildingCounts: BuildingCount[];
		fulltext: Pick<Fulltext.Props, "value" | "onFulltext">;
		cursor: Pick<Cursor.Props, "cursor" | "onPage" | "onSize">;
	}
}

export const GameManager: FC<GameManager.Props> = ({
	data,
	userId,
	cycle,
	dependencies,
	inventory,
	buildingCounts,
	fulltext,
	cursor,
}) => {
	return (
		<div className={"flex flex-col gap-2"}>
			<Fulltext {...fulltext} />
			<CycleButton
				userId={userId}
				cycle={cycle}
				css={{
					base: ["fixed", "bottom-4", "right-4", "z-10"],
				}}
				variant={{ size: "md" }}
			/>
			<Cursor
				count={data.count}
				textTotal={<Tx label={"Count of buildings"} />}
				{...cursor}
			/>
			<div className={"grid grid-cols-1 gap-4"}>
				{data.data.map((item) => {
					return (
						<BuildingItem
							key={item.id}
							entity={item}
							userId={userId}
							dependencies={dependencies}
							inventory={inventory}
							buildingCounts={buildingCounts}
						/>
					);
				})}
			</div>
		</div>
	);
};
