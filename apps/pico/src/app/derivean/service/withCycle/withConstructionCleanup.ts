import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withConstructionCleanup {
	export interface Props {
		tx: WithTransaction;
		userId: string;
	}
}

export const withConstructionCleanup = async ({
	tx,
	userId,
}: withConstructionCleanup.Props) => {
	const routeResourceQueue = await tx
		.selectFrom("Route_Resource as rr")
		.select(["rr.id", "rr.routeId", "rr.resourceId"])
		.where(
			"rr.routeId",
			"in",
			tx
				.selectFrom("Route as r")
				.innerJoin("Building as b", "b.id", "r.toId")
				.select("r.id")
				.where("b.constructionId", "is not", null)
				.where("r.userId", "=", userId),
		)
		.execute();

	for await (const { id, routeId, resourceId } of routeResourceQueue) {
		const requirement = await tx
			.selectFrom("Blueprint_Requirement as br")
			.select(["br.amount"])
			.where("br.resourceId", "=", resourceId)
			.where(
				"br.blueprintId",
				"=",
				tx
					.selectFrom("Route as r")
					.innerJoin("Building as b", "b.id", "r.toId")
					.select("b.blueprintId")
					.where("r.id", "=", routeId),
			)
			.executeTakeFirst();

		const inventory = await tx
			.selectFrom("Inventory as i")
			.select(["i.amount"])
			.where("i.resourceId", "=", resourceId)
			.where(
				"i.id",
				"in",
				tx
					.selectFrom("Building_Inventory as bi")
					.select(["bi.inventoryId"])
					.where(
						"bi.buildingId",
						"=",
						tx
							.selectFrom("Route as r")
							.select("r.toId")
							.where("r.id", "=", routeId),
					),
			)
			.executeTakeFirst();

		if (!requirement || !inventory) {
			continue;
		}

		if (inventory.amount >= requirement.amount) {
			await tx.deleteFrom("Route_Resource").where("id", "=", id).execute();
		}
	}
};
