import { DateTime, genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { withBuildingRouteBuilding } from "~/app/derivean/service/withBuildingRouteBuilding";
import { withConstruction } from "~/app/derivean/service/withCycle/withConstruction";
import { withDemand } from "~/app/derivean/service/withCycle/withDemand/withDemand";
import { withProduction } from "~/app/derivean/service/withCycle/withProduction";
import { withProductionPlan } from "~/app/derivean/service/withCycle/withProductionPlan";
import { withTransport } from "~/app/derivean/service/withCycle/withTransport/withTransport";

export namespace withCycle {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
		mapId: string;
	}
}

export const withCycle = async ({ tx, userId, mapId }: withCycle.Props) => {
	try {
		console.info("=== Starting a new Cycle");

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
		 * Ensure all paths are computed even it should be OK in this stage.
		 */
		await withBuildingRouteBuilding({
			tx,
			userId,
			mapId,
		});

		/**
		 * Resolve demand of buildings:
		 * - check construction
		 * - check production
		 */
		await withDemand({
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
			mapId,
		});

		await withProductionPlan({
			tx,
			userId,
			mapId,
		});

		await withTransport({
			tx,
			userId,
			mapId,
		});

		/**
		 * Cleanup fulfilled demands.
		 */
		await tx.deleteFrom("Demand").where("amount", "<=", 0).execute();

		/**
		 * Delete finished transports.
		 */
		await tx.deleteFrom("Transport").where("amount", "<=", 0).execute();

		console.info("\t-- Cycle finished");
	} catch (e) {
		console.error(e);
		throw e;
	}
};
