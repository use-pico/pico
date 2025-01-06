import { useMutation } from "@tanstack/react-query";
import { toast, useSourceInvalidator } from "@use-pico/client";
import { translator } from "@use-pico/common";
import { BaseBuildingProductionSource } from "~/app/derivean/building/base/production/BaseBuildingProductionSource";
import { BuildingProductionQueueSource } from "~/app/derivean/building/production/BuildingProductionQueueSource";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";
import { kysely } from "~/app/derivean/db/db";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";

export namespace useProductionMutation {
	export interface Request {
		baseBuildingProductionId: string;
		buildingId: string;
		userId: string;
	}
}

export const useProductionMutation = () => {
	const invalidator = useSourceInvalidator({
		sources: [
			BaseBuildingProductionSource,
			BuildingProductionQueueSource,
			InventorySource,
		],
	});

	return useMutation({
		mutationKey: ["useProductionMutation"],
		async mutationFn({
			baseBuildingProductionId,
			buildingId,
			userId,
		}: useProductionMutation.Request) {
			return toast.promise(
				kysely.transaction().execute(async (tx) => {
					const baseBuildingProduction =
						await BaseBuildingProductionSource.getOrThrow$({
							tx,
							id: baseBuildingProductionId,
							error: "Cannot find base building production",
						});

					for await (const requirement of baseBuildingProduction.requirements) {
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

					const shape = {
						baseBuildingProductionId,
						buildingId,
						amount: baseBuildingProduction.amount,
						resourceId: baseBuildingProduction.resourceId,
						start: cycles,
						current: 0,
						finish: cycles + baseBuildingProduction.cycles,
					} as const;

					await BuildingProductionQueueSource.create$({
						tx,
						shape,
						entity: shape,
					});
				}),
				{
					loading: translator.text("Queuing production... (label)"),
					error: translator.text("Failed to queue production. (label)"),
					success: translator.text("Production queued. (label)"),
				},
			);
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
