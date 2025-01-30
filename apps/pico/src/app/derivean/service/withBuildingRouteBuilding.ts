import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";
import { withPathOf } from "~/app/derivean/service/withPathOf";

export namespace withBuildingRouteBuilding {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withBuildingRouteBuilding = async ({
	tx,
	userId,
	mapId,
}: withBuildingRouteBuilding.Props) => {
	await tx
		.deleteFrom("Building_Route_Building as brb")
		.where("brb.userId", "=", userId)
		.execute();

	const inserts = withPathOf(
		await withBuildingGraph({ tx, userId, mapId }),
	).map((item) => ({
		id: genId(),
		mapId,
		userId,
		...item,
	}));

	inserts.length > 0 &&
		(await tx.insertInto("Building_Route_Building").values(inserts).execute());
};
