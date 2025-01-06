import { translator } from "@use-pico/common";
import type { Transaction } from "kysely";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { BuildingQueueSource } from "~/app/derivean/building/queue/BuildingQueueSource";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";
import type { Database } from "~/app/derivean/db/Database";
import { inventoryCheck } from "~/app/derivean/inventory/inventoryCheck";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";

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
			!inventoryCheck({
				requirements: baseBuilding.requirements,
				inventory: await InventorySource.list$({
					tx,
					where: { userId },
				}),
			}).check
		) {
			throw new Error(
				translator.text("Not enough resources to construct the building."),
			);
		}
	}

	for await (const requirement of baseBuilding.requirements) {
		if (requirement.passive) {
			continue;
		}

		const item = await InventorySource.fetchOrThrow$({
			tx,
			where: {
				userId,
				resourceId: requirement.resourceId,
			},
		});

		await InventorySource.patch$({
			tx,
			entity: {
				amount: item.amount - requirement.amount,
			},
			shape: {
				amount: item.amount - requirement.amount,
			},
			where: {
				userId,
				resourceId: requirement.resourceId,
			},
		});
	}

	const { filter: cycles } = await CycleSource.count$({
		tx,
		where: { userId },
	});

	const entity = {
		userId,
		baseBuildingId: baseBuilding.id,
		start: cycles,
		current: 0,
		finish: cycles + baseBuilding.cycles,
	} as const;

	await BuildingQueueSource.create$({
		tx,
		shape: entity,
		entity,
	});
};