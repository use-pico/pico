import { genId } from "@use-pico/common";
import { sql } from "kysely";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

function changeOf(percentage: number) {
	return Math.random() < percentage / 100;
}

function getRandomSize(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCoordinates(maxValue = 20480, step = 512) {
	const randomStep = () => Math.floor(Math.random() * (maxValue / step)) * step;

	return {
		x: randomStep(),
		y: randomStep(),
	};
}

// eslint-disable-next-line max-params
async function isOverlapping(
	tx: WithTransaction,
	mapId: string,
	coord: { x: number; y: number },
	size: { width: number; height: number },
) {
	const land = await tx
		.selectFrom("Land as l")
		.where("l.mapId", "=", mapId)
		.where((eb) =>
			eb.not(
				eb.or([
					eb("l.x", ">=", coord.x + size.width),
					eb(sql`l.x + l.width`, "<=", coord.x),
					eb("l.y", ">=", coord.y + size.height),
					eb(sql`l.y + l.height`, "<=", coord.y),
				]),
			),
		)
		.select("id")
		.executeTakeFirst();

	return Boolean(land);
}

export namespace withMapGenerator {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		name: string;
		size?: {
			world: number;
			land: number;
		};
	}
}

export const withMapGenerator = async ({
	tx,
	userId,
	name,
	size = {
		world: 32,
		land: 2048,
	},
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

	for await (const {
		id,
		probability,
		limit,
		minWidth,
		maxWidth,
		minHeight,
		maxHeight,
	} of regions) {
		for (let i = 0; i < limit; i++) {
			if (!changeOf(probability)) {
				continue;
			}

			let attempts = 0;
			const maxAttempts = 10;

			while (attempts < maxAttempts) {
				const width = getRandomSize(minWidth, maxWidth) * size.land;
				const height = getRandomSize(minHeight, maxHeight) * size.land;
				/**
				 * 1024 * 1024 defines basically overall map size.
				 *
				 * It's not precise as land size will overflow, but it's good enough for now.
				 */
				const coord = getCoordinates(4096 * size.world);

				const overlapping = await isOverlapping(tx, map.id, coord, {
					width,
					height,
				});

				if (!overlapping) {
					await tx
						.insertInto("Land")
						.values({
							id: genId(),
							height,
							width,
							regionId: id,
							mapId: map.id,
							...coord,
						})
						.execute();
					break;
				}

				attempts++;
			}
		}
	}
};
