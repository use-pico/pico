import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withProductionDemand {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withProductionDemand = async ({
	tx,
	userId,
	mapId,
}: withProductionDemand.Props) => {
	console.warn("Not implemented yet");
};
