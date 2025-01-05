import type { Transaction } from "kysely";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import type { Database } from "~/app/derivean/db/Database";
import { resourceCheckOf } from "~/app/derivean/resource/resourceCheckOf";
import { resourceSumOf } from "~/app/derivean/resource/resourceSumOf";

export namespace withConstruct {
	export interface Props {
		tx: Transaction<Database>;
		/**
		 * Owner of a building
		 */
		userId: string;
		/**
		 * Building to construct
		 */
		baseBuildingId: string;
		/**
		 * Bypass resource requirement checks, just execute the construction.
		 *
		 * This in general bypasses all checks and should be used with caution.
		 */
		bypass?: boolean;
	}
}

export const withConstruct = async ({
	tx,
	userId,
	baseBuildingId,
	bypass = false,
}: withConstruct.Props) => {
	const baseBuilding = await BaseBuildingSource.getOrThrow$({
		tx,
		id: baseBuildingId,
	});

	if (!bypass) {
		if (
			!resourceCheckOf({
				requirements: baseBuilding.requirements,
				resources: resourceSumOf({
					resources: await BuildingResourceSource.list$({
						tx,
						where: { userId },
					}),
				}),
			})
		) {
			throw new Error("Not enough resources to construct the building.");
		}
	}

	await BuildingSource.create$({
		tx,
		shape: {
			baseBuildingId: baseBuilding.id,
		},
		entity: {
			baseBuildingId: baseBuilding.id,
			userId,
		},
	});
};
