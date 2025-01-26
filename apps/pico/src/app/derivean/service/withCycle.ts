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
		mapId: string;
	}
}

export const withCycle = async ({ tx, userId, mapId }: withCycle.Props) => {
	try {
		await tx
			.insertInto("Cycle")
			.values({
				id: genId(),
				stamp: DateTime.now().toUTC().toSQLTime(),
				userId,
				mapId,
			})
			.execute();

		/**
		 * Transport, preparing for production
		 */
		await withTransport({
			tx,
			userId,
			mapId,
		});

		await withConstruction({
			tx,
			userId,
			mapId,
		});

		/**
		 * Produce stuff
		 */
		await withProduction({
			tx,
			userId,
		});
	} catch (e) {
		console.error(e);
		throw e;
	}
};
