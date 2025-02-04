import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";
import { withPathOf } from "~/app/derivean/service/withPathOf";

export namespace withBuildingToBuilding {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withBuildingToBuilding = async ({
	tx,
	userId,
	mapId,
}: withBuildingToBuilding.Props) => {
	console.info("\t=== Building To Building");

	await tx
		.deleteFrom("Building_To_Building as btb")
		.where("btb.userId", "=", userId)
		.execute();

	const related = withPathOf(await withBuildingGraph({ tx, userId, mapId }));

	const inserts = related.map((item) => ({
		id: genId(),
		mapId,
		userId,
		...item,
	}));

	const names = (
		await tx
			.selectFrom("Building as b")
			.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
			.innerJoin("Land as l", "l.id", "b.landId")
			.select(["b.id", "bl.name"])
			.where(
				"b.id",
				"in",
				related.map(({ buildingId }) => buildingId),
			)
			.where(
				"b.id",
				"in",
				related.map(({ linkId }) => linkId),
			)
			.execute()
	).reduce(
		(acc, { id, name }) => {
			acc[id] = name;
			return acc;
		},
		{} as Record<string, string>,
	);

	console.info(
		"\t\t-- Related buildings",
		related.map(({ buildingId, linkId }) => {
			return {
				building: names[buildingId],
				link: names[linkId],
			};
		}),
	);

	inserts.length > 0 &&
		(await tx.insertInto("Building_To_Building").values(inserts).execute());

	console.info("\t-- Done");
};
