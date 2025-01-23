import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withConstruction {
	export interface Props {
		tx: WithTransaction;
		userId: string;
	}
}

export const withConstruction = async ({
	tx,
	userId,
}: withConstruction.Props) => {
	const constructionQueue = await tx
		.selectFrom(
			tx
				.selectFrom("Building as b")
				.innerJoin("Construction as c", "c.id", "b.constructionId")
				.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
				.select([
					"b.id as buildingId",
					"c.id",
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
				.where("c.plan", "=", false)
				.as("building"),
		)
		.where("building.withAvailableResources", "=", true)
		.selectAll()
		.execute();

	for await (const { id, cycle, cycles, buildingId } of constructionQueue) {
		/**
		 * Drop all construction routes as we're sure all requirements are met
		 */
		await tx.deleteFrom("Route").where("toId", "=", buildingId).execute();

		if (cycle > cycles) {
			await tx.deleteFrom("Construction").where("id", "=", id).execute();

			continue;
		}

		await tx
			.updateTable("Construction")
			.set("cycle", cycle + 1)
			.where("id", "=", id)
			.execute();
	}
};
