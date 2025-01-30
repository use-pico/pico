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
	console.info("\t\t=== Construction demand");

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

	if (!construction.length) {
		console.info("\t\t\t-- Construction queue is empty");
	}

	for await (const { id, name, blueprintId } of construction) {
		console.info("\t\t\t-- Resolving construction demand", { name });

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
			.where((eb) => {
				/**
				 * Ignore already demanded resources
				 */
				return eb.not(
					eb.exists(
						eb
							.selectFrom("Demand as d")
							.select(["d.id"])
							.where("d.buildingId", "=", id)
							.whereRef("d.resourceId", "=", "br.resourceId"),
					),
				);
			})
			.where((eb) => {
				return eb.not(
					eb.exists(
						eb
							.selectFrom("Inventory as i")
							.select(["i.id"])
							.innerJoin("Building_Inventory as bi", (eb) => {
								return eb
									.on("bi.buildingId", "=", id)
									.onRef("bi.inventoryId", "=", "i.id");
							})
							.whereRef("i.resourceId", "=", "br.resourceId")
							.whereRef("i.amount", ">=", "br.amount")
							.where("i.type", "=", "construction"),
					),
				);
			})
			.execute();

		if (!requirements.length) {
			console.info(
				"\t\t\t\t-- No required resources or resources already demanded/on the way.",
			);
		}

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

			console.log("\t\t\t\t-- Inventory", {
				resource: inventory.name,
				amount: inventory.amount,
			});

			if (inventory.amount < amount) {
				console.info("\t\t\t\t\t-- Demanding resource", {
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

	console.info("\t\t-- Done");
};
