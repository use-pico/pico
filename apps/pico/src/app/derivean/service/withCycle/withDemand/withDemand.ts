import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withConstructionDemand } from "~/app/derivean/service/withCycle/withDemand/withConstructionDemand";

export namespace withDemand {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withDemand = async ({ tx, userId, mapId }: withDemand.Props) => {
	console.info("\t=== Demand");

	await withConstructionDemand({ tx, userId, mapId });

	console.info("\t-- Done");
};
