import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withConstructionDemand {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withConstructionDemand = async ({
	tx,
	userId,
	mapId,
}: withConstructionDemand.Props) => {
	console.info("=== Construction demand");

	const construction = await tx
		.selectFrom("Building as b")
		.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
		.innerJoin("Land as l", "l.id", "b.landId")
		.where("b.userId", "=", userId)
		.where("l.mapId", "=", mapId)
		.where("b.constructionId", "is not", null)
		.where("b.valid", "=", true)
		.select(["b.id", "b.blueprintId", "bl.name"])
		.execute();

	for await (const { id, name, blueprintId } of construction) {
		console.info("\t-- Resolving construction demand", { name });

		const requirements = await tx
			.selectFrom("Blueprint_Requirement as br")
			.innerJoin("Resource as r", "r.id", "br.resourceId")
			.select(["br.resourceId", "br.amount", "r.name"])
			.where("br.blueprintId", "=", blueprintId)
			.where((eb) => {
				/**
				 * Ignore resources already on the way (because they're transported, they already
				 * fulfilled original requirement).
				 */
				return eb.not(
					eb.exists(
						eb
							.selectFrom("Transport as t")
							.select(["t.id"])
							.where("t.targetId", "=", id)
							.whereRef("t.resourceId", "=", "br.resourceId"),
					),
				);
			})
			.execute();

		for await (const {
			resourceId,
			name: resourceName,
			amount,
		} of requirements) {
			const inventory = await tx
				.selectFrom("Inventory as i")
				.innerJoin("Resource as r", "r.id", "i.resourceId")
				.select(["i.resourceId", "i.amount", "r.name"])
				.where(
					"i.id",
					"in",
					tx
						.selectFrom("Building_Inventory")
						.select("inventoryId")
						.where("buildingId", "=", id),
				)
				.where("i.resourceId", "=", resourceId)
				.where("i.type", "=", "construction")
				.executeTakeFirst();

			if (!inventory) {
				console.warn(
					`Wrong building [${name}] configuration: requested resource [${resourceName}] not found in the inventory`,
				);
				continue;
			}

			console.log("\t\t-- Inventory", {
				resource: inventory.name,
				amount: inventory.amount,
			});

			if (inventory.amount < amount) {
				console.info("\t\t\t-- Demanding resource", {
					resource: resourceName,
					amount: Math.max(0, amount - inventory.amount),
				});

				await tx
					.insertInto("Demand")
					.values({
						id: genId(),
						mapId,
						userId,
						amount: Math.max(0, amount - inventory.amount),
						buildingId: id,
						priority: 10,
						resourceId,
						type: "construction",
					})
					.onConflict((oc) => {
						return oc.columns(["buildingId", "resourceId"]).doUpdateSet({
							amount: Math.max(0, amount - inventory.amount),
						});
					})
					.execute();
			}
		}
	}
};
