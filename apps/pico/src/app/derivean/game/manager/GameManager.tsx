import { Cursor, Fulltext, Tx, type withListCount } from "@use-pico/client";
import type { FC } from "react";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { BuildingItem } from "~/app/derivean/game/manager/GameManager/BuildingItem";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace GameManager {
	export interface Props {
		data: withListCount.Result<MapSchema.Type>;
		userId: string;
		cycle: number;
		inventory: InventorySchema["~entity-array"];
		fulltext: Pick<Fulltext.Props, "value" | "onFulltext">;
		cursor: Pick<Cursor.Props, "cursor" | "onPage" | "onSize">;
	}
}

export const GameManager: FC<GameManager.Props> = ({
	data,
	userId,
	cycle,
	inventory,
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
							inventory={inventory}
						/>
					);
				})}
			</div>
		</div>
	);
};
