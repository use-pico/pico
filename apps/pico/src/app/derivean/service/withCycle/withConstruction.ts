import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withConstruction {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withConstruction = async ({
	tx,
	userId,
	mapId,
}: withConstruction.Props) => {
	console.info("\t=== Construction");

	const constructionQueue = await tx
		.selectFrom(
			tx
				.selectFrom("Building as b")
				.innerJoin("Construction as c", "c.id", "b.constructionId")
				.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
				.innerJoin("Land as l", "l.id", "b.landId")
				.select([
					"b.id as buildingId",
					"c.id",
					"b.blueprintId",
					"bl.name",
					"c.cycle",
					"bl.cycles",
					(eb) => {
						return eb
							.case()
							.when(
								eb.not(
									eb.exists(
										eb
											.selectFrom("Blueprint_Requirement as br")
											.select(eb.lit(1).as("one"))
											.whereRef("br.blueprintId", "=", "b.blueprintId")
											.where((eb) =>
												eb.not(
													eb.exists(
														eb
															.selectFrom("Inventory as i")
															.select(eb.lit(1).as("one"))
															.where(
																"i.id",
																"in",
																eb
																	.selectFrom("Building_Inventory")
																	.select("inventoryId")
																	.whereRef("buildingId", "=", "b.id"),
															)
															.where("i.type", "=", "construction")
															.whereRef("i.resourceId", "=", "br.resourceId")
															.whereRef("i.amount", ">=", "br.amount"),
													),
												),
											),
									),
								),
							)
							.then(eb.lit(true))
							.else(eb.lit(false))
							.end()
							.as("withAvailableResources");
					},
				])
				.where("b.userId", "=", userId)
				.where("l.mapId", "=", mapId)
				.where("c.plan", "=", false)
				.as("building"),
		)
		.where("building.withAvailableResources", "=", true)
		.selectAll()
		.execute();

	if (!constructionQueue.length) {
		console.info(
			"\t\t-- No construction in queue or not enough resource to proceed",
		);
	}

	for await (const {
		id,
		cycle,
		cycles,
		buildingId,
		blueprintId,
		name,
	} of constructionQueue) {
		console.info("\t\t\t-- Resolving construction", { name });

		if (cycle >= cycles) {
			await tx.deleteFrom("Construction").where("id", "=", id).execute();

			const production = await tx
				.selectFrom("Blueprint_Production as bp")
				.select(["bp.resourceId"])
				.where("bp.blueprintId", "=", blueprintId)
				.execute();

			for await (const { resourceId } of production) {
				try {
					await tx
						.insertInto("Supply")
						.values({
							id: genId(),
							buildingId,
							resourceId,
						})
						.execute();
				} catch (_) {
					//
				}
			}

			continue;
		}

		await tx
			.updateTable("Construction")
			.set("cycle", cycle + 1)
			.where("id", "=", id)
			.execute();
	}

	console.info("\t-- Done");
};
