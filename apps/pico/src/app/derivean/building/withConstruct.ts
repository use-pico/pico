import type { Transaction } from "kysely";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { BuildingResourceRepository } from "~/app/derivean/building/resource/BuildingResourceRepository";
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
	const baseBuilding = await BaseBuildingRepository(tx).fetchOrThrow({
		tx,
		query: { where: { id: baseBuildingId } },
	});

	if (!bypass) {
		if (
			!resourceCheckOf({
				requirements: baseBuilding.requirements,
				resources: resourceSumOf({
					resources: await BuildingResourceRepository(tx).list({
						tx,
						query: { where: { userId } },
					}),
				}),
			})
		) {
			throw new Error("Not enough resources to construct the building.");
		}
	}
};
