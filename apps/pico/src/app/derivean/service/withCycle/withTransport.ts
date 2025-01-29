import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withTransportRoute } from "~/app/derivean/service/withCycle/withTransport/withTransportRoute";

export namespace withTransport {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withTransport = async ({
	tx,
	userId,
	mapId,
}: withTransport.Props) => {
	/**
	 * Plan transport routes.
	 *
	 * This may be quite complex as it recalculates current state of routes and
	 * searches for shortest path.
	 */
	await withTransportRoute({ tx, userId, mapId });
};
