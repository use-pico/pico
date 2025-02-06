import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { Game } from "~/app/derivean/Game";

function changeOf(percentage: number) {
	return Math.random() < percentage / 100;
}

export namespace withMapGenerator {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		name: string;
	}
}

export const withMapGenerator = async ({
	tx,
	userId,
	name,
}: withMapGenerator.Props) => {
	const map = await tx
		.insertInto("Map")
		.values({
			id: genId(),
			userId,
			name,
		})
		.returning("id")
		.executeTakeFirstOrThrow();

	const regions = await tx.selectFrom("Region").selectAll().execute();

	const world = Game.world.lands ** 2;
	const handbrake = 4096 * 4;
	let landId = 0;

	while (landId < world && landId <= handbrake) {
		for await (const { id, probability, name } of regions) {
			console.log("\t\t-- Region", { id, probability, landId, world });

			if (landId >= world) {
				console.log("\t\t-- Finished");
				break;
			}

			if (!changeOf(probability)) {
				console.log("\t\t\t-- Won't generate");
				continue;
			}

			console.log("\t\t-- New land", {
				name,
				landId,
			});

			const land = await tx
				.insertInto("Land")
				.values({
					id: genId(),
					regionId: id,
					mapId: map.id,
					position: landId,
				})
				.returningAll()
				.executeTakeFirstOrThrow();

			await tx
				.insertInto("Plot")
				.values(
					Array.from({ length: Game.land.plots ** 2 }, (_, position) => ({
						id: genId(),
						mapId: map.id,
						userId,
						landId: land.id,
						position,
					})),
				)
				.execute();

			landId += 1;
		}
	}

	return map;
};
