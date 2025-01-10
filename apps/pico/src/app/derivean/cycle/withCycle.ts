import { DateTime, genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";

export namespace withCycle {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withCycle = async ({ tx, userId }: withCycle.Props) => {
	return new Promise((res) => {
		setTimeout(async () => {
			await tx
				.insertInto("Cycle")
				.values({
					id: genId(),
					stamp: DateTime.now().toUTC().toSQLTime(),
					userId,
				})
				.execute();

			const cycle = (
				await tx
					.selectFrom("Cycle as c")
					.select((eb) => eb.fn.count<number>("c.id").as("count"))
					.where("c.userId", "=", userId)
					.executeTakeFirstOrThrow()
			).count;

			const buildingQueue = await tx
				.selectFrom("Building_Queue as bq")
				.select(["bq.id", "bq.cycle", "bq.to", "bq.buildingBaseId"])
				.where("userId", "=", userId)
				.execute();

			for await (const queue of buildingQueue) {
				if (cycle > queue.to) {
					await tx
						.insertInto("Building")
						.values({
							id: genId(),
							buildingBaseId: queue.buildingBaseId,
							userId,
						})
						.execute();

					await tx
						.deleteFrom("Building_Queue")
						.where("id", "=", queue.id)
						.execute();

					continue;
				}

				await tx
					.updateTable("Building_Queue")
					.set("cycle", queue.cycle + 1)
					.where("id", "=", queue.id)
					.execute();
			}

			res(undefined);
			/**
			 * I'll keep this "break" here to prevent overclicking on the cycle button.
			 */
		}, 1000);
	});
};
