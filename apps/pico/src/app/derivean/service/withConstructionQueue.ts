import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";

export namespace withConstructionQueue {
	export interface Props {
		userId: string;
		blueprintId: string;
		landId: string;
		x: number;
		y: number;
		plan: boolean;
		valid: boolean;
	}
}

export const withConstructionQueue = async ({
	userId,
	blueprintId,
	landId,
	x,
	y,
	plan,
	valid,
}: withConstructionQueue.Props) => {
	return kysely.transaction().execute(async (tx) => {
		const blueprint = await tx
			.selectFrom("Blueprint as b")
			.select(["b.cycles"])
			.where("b.id", "=", blueprintId)
			.executeTakeFirstOrThrow();

		const building = await tx
			.insertInto("Building")
			.values({
				id: genId(),
				userId,
				blueprintId,
				landId,
				constructionId: (
					await tx
						.insertInto("Construction")
						.values({
							id: genId(),
							userId,
							cycle: 0,
							cycles: blueprint.cycles,
							plan,
						})
						.returning("id")
						.executeTakeFirstOrThrow()
				).id,
				x,
				y,
				valid,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		const inventory = await tx
			.selectFrom("Inventory as i")
			.select(["i.amount", "i.limit", "i.resourceId", "i.type"])
			.where(
				"i.id",
				"in",
				tx
					.selectFrom("Blueprint_Inventory as bi")
					.select("bi.inventoryId")
					.where("bi.blueprintId", "=", blueprintId),
			)
			.execute();

		for await (const { amount, limit, resourceId, type } of inventory) {
			await tx
				.insertInto("Building_Inventory")
				.values({
					id: genId(),
					buildingId: building.id,
					inventoryId: (
						await tx
							.insertInto("Inventory")
							.values({
								id: genId(),
								amount,
								limit,
								resourceId,
								type,
							})
							.returning("id")
							.executeTakeFirstOrThrow()
					).id,
				})
				.execute();
		}

		return building;
	});
};
