import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withTransport {
	export interface Props {
		tx: WithTransaction;
		userId: string;
	}
}

export const withTransport = async ({ tx, userId }: withTransport.Props) => {
	const transportQueue = await tx
		.selectFrom("Route as r")
		.select(["r.id", "r.toId", "r.fromId"])
		.where("r.userId", "=", userId)
		.execute();

	for await (const { id, fromId, toId } of transportQueue) {
		const resourceQueue = await tx
			.selectFrom("Route_Resource as rr")
			.select(["rr.amount", "rr.resourceId"])
			.where("rr.routeId", "=", id)
			.execute();

		for await (const { amount, resourceId } of resourceQueue) {
			const sourceInventory = await tx
				.selectFrom("Inventory as i")
				.select(["i.id", "i.amount", "i.limit"])
				.where(
					"i.id",
					"in",
					tx
						.selectFrom("Building_Inventory as bi")
						.select("bi.inventoryId")
						.where("bi.buildingId", "=", fromId),
				)
				.where("i.resourceId", "=", resourceId)
				.executeTakeFirst();

			const targetInventory = await tx
				.selectFrom("Inventory as i")
				.select(["i.id", "i.amount", "i.limit"])
				.where(
					"i.id",
					"in",
					tx
						.selectFrom("Building_Inventory as bi")
						.select("bi.inventoryId")
						.where("bi.buildingId", "=", toId),
				)
				.where("i.resourceId", "=", resourceId)
				.executeTakeFirst();

			if (!sourceInventory || !targetInventory) {
				console.log("Source or target is not compatible");
				continue;
			}

			const $amount = Math.min(
				sourceInventory.amount,
				amount === null || amount === undefined ?
					sourceInventory.amount
				:	amount,
			);
			if (targetInventory.amount + $amount > targetInventory.limit) {
				console.log("Target is full");
				continue;
			}

			await tx
				.updateTable("Inventory")
				.set({
					amount: sourceInventory.amount - $amount,
				})
				.where("id", "=", sourceInventory.id)
				.execute();

			await tx
				.updateTable("Inventory")
				.set({
					amount: targetInventory.amount + $amount,
				})
				.where("id", "=", targetInventory.id)
				.execute();
		}
	}
};
