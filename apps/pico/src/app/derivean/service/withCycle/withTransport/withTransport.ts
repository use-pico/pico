import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withTransportDemand } from "~/app/derivean/service/withCycle/withTransport/withTransportDemand";
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
	await withTransportRoute({ tx, userId, mapId });
	await withTransportDemand({ tx, userId, mapId });
};
