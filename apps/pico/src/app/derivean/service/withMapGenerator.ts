import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

function changeOf(percentage: number) {
	return Math.random() < percentage / 100;
}

function getCoordinates(maxValue = 20480, step = 512) {
	const randomStep = () => Math.floor(Math.random() * (maxValue / step)) * step;

	return {
		x: randomStep(),
		y: randomStep(),
	};
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

			const width =
				Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
			const height =
				Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

			await tx
				.insertInto("Land")
				.values({
					id: genId(),
					height,
					width,
					regionId: id,
					mapId: map.id,
					...getCoordinates(),
				})
				.execute();
		}
	}
};
