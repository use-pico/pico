import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withProductionQueue } from "~/app/derivean/service/withProductionQueue";

export namespace withProductionPlan {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withProductionPlan = async ({
	tx,
	userId,
	mapId,
}: withProductionPlan.Props) => {
	console.info("\t=== Production Plan");

	const productionPlanQueue = await tx
		.selectFrom("Building as b")
		.select(["b.id as buildingId", "b.productionId"])
		.where("b.userId", "=", userId)
		.where("b.productionId", "is not", null)
		.execute();

	if (!productionPlanQueue.length) {
		console.info("\t\t-- Production queue is empty");
	}

	for await (const { buildingId, productionId } of productionPlanQueue) {
		try {
			const { count: queueSize } = await tx
				.selectFrom("Production as p")
				.where("p.buildingId", "=", buildingId)
				.select((eb) => eb.fn.count<number>("p.id").as("count"))
				.executeTakeFirstOrThrow();

			if (queueSize > 0) {
				continue;
			}

			const inQueue = await withProductionQueue({
				tx,
				userId,
				mapId,
				blueprintProductionId: productionId!,
				buildingId,
			});

			if (inQueue) {
				await tx
					.updateTable("Building")
					.set({ productionId: null })
					.where("id", "=", buildingId)
					.execute();
			}
		} catch (e) {
			console.error(e);
			// Probably not enough resources or something like that.
		}
	}

	const recurringProductionPlanQueue = await tx
		.selectFrom("Building as b")
		.select(["b.id as buildingId", "b.recurringProductionId"])
		.where("b.userId", "=", userId)
		.where("b.recurringProductionId", "is not", null)
		.execute();

	if (!recurringProductionPlanQueue.length) {
		console.info("\t\t-- Recurring production queue is empty");
	}

	for await (const {
		buildingId,
		recurringProductionId,
	} of recurringProductionPlanQueue) {
		try {
			const { count: queueSize } = await tx
				.selectFrom("Production as p")
				.where("p.buildingId", "=", buildingId)
				.select((eb) => eb.fn.count<number>("p.id").as("count"))
				.executeTakeFirstOrThrow();

			if (queueSize > 0) {
				continue;
			}

			await withProductionQueue({
				tx,
				userId,
				mapId,
				blueprintProductionId: recurringProductionId!,
				buildingId,
			});
		} catch (e) {
			console.error(e);
			// Probably not enough resources or something like that.
		}
	}

	console.info("\t-- Done");
};
