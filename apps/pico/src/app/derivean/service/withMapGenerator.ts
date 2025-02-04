import { genId } from "@use-pico/common";
import { convertToObject } from "typescript";
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

	const limits = new Map<string, number>();

	const world = Game.world.lands ** 2;
	const handbrake = 4096 * 4;
	let landId = 0;

	while (landId < world && landId <= handbrake) {
		for await (const { id, probability, name, limit } of regions) {
			console.log("\t\t-- Region", { id, probability, limit, landId, world });

			if (landId >= world) {
				console.log("\t\t-- Finished");
				break;
			}

			if (!changeOf(probability)) {
				console.log("\t\t\t-- Won't generate");
				continue;
			}

			console.log("\t\t\t-- Generating");

			limits.set(id, (limits.get(id) ?? 0) + 1);
			if ((limits.get(id) || 0) >= limit) {
				console.log("\t\t\t-- Limit reached");
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

			for (let plotId = 0; plotId < Game.land.plots ** 2; plotId++) {
				await tx
					.insertInto("Plot")
					.values({
						id: genId(),
						mapId: map.id,
						userId,
						landId: land.id,
						position: plotId,
					})
					.execute();
			}

			landId += 1;
		}
	}

	return map;
};
