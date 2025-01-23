import { DateTime, genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { withConstruction } from "~/app/derivean/service/withCycle/withConstruction";
import { withProduction } from "~/app/derivean/service/withCycle/withProduction";
import { withTransport } from "~/app/derivean/service/withCycle/withTransport";

export namespace withCycle {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withCycle = async ({ tx, userId }: withCycle.Props) => {
	try {
		await tx
			.insertInto("Cycle")
			.values({
				id: genId(),
				stamp: DateTime.now().toUTC().toSQLTime(),
				userId,
			})
			.execute();

		const currentCycle = (
			await tx
				.selectFrom("Cycle as c")
				.select((eb) => eb.fn.count<number>("c.id").as("count"))
				.where("c.userId", "=", userId)
				.executeTakeFirstOrThrow()
		).count;

		await withConstruction({
			tx,
			userId,
			currentCycle,
		});

		/**
		 * Transport, preparing for production
		 */
		await withTransport({
			tx,
			userId,
		});

		/**
		 * Produce stuff
		 */
		await withProduction({
			tx,
			userId,
			currentCycle,
		});

		/**
		 * Transport produced stuff
		 */
		await withTransport({
			tx,
			userId,
		});
	} catch (e) {
		console.error(e);
		throw e;
	}
};
