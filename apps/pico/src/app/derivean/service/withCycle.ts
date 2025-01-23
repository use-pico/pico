import { DateTime, genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { withConstruction } from "~/app/derivean/service/withCycle/withConstruction";
import { withConstructionCleanup } from "~/app/derivean/service/withCycle/withConstructionCleanup";
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

		await withConstruction({
			tx,
			userId,
		});

		/**
		 * Various cleanup stuff during construction:
		 * - remove routes with fulfilled resource
		 */
		await withConstructionCleanup({
			tx,
			userId,
		});

		/**
		 * Produce stuff
		 */
		await withProduction({
			tx,
			userId,
		});

		/**
		 * Transport, preparing for production
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
