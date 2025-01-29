import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withConstructionDemand } from "~/app/derivean/service/withCycle/withDemand/withConstructionDemand";
import { withDemandSupplier } from "~/app/derivean/service/withCycle/withDemand/withDemandSupplier";
import { withProductionDemand } from "~/app/derivean/service/withCycle/withDemand/withProductionDemand";

export namespace withDemand {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withDemand = async ({ tx, userId, mapId }: withDemand.Props) => {
	await Promise.all([
		/**
		 * Construction and production demands could be resolved in parallel.
		 */
		withConstructionDemand({ tx, userId, mapId }),
		withProductionDemand({ tx, userId, mapId }),
	]);

	/**
	 * Cleanup fulfilled demands.
	 */
	await tx.deleteFrom("Demand").where("amount", "<=", 0).execute();

	/**
	 * Demands are prepared, now resolve suppliers for demands.
	 */
	await withDemandSupplier({ tx, userId, mapId });
};
