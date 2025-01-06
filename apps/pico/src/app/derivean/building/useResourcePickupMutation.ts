import { useMutation } from "@tanstack/react-query";
import { toast, useSourceInvalidator } from "@use-pico/client";
import { translator } from "@use-pico/common";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import { kysely } from "~/app/derivean/db/db";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";

export namespace useResourcePickupMutation {
	export interface Request {
		buildingId: string;
	}
}

export const useResourcePickupMutation = () => {
	const invalidator = useSourceInvalidator({
		sources: [BuildingResourceSource, InventorySource],
	});

	return useMutation({
		mutationKey: ["useResourcePickupMutation"],
		async mutationFn({ buildingId }: useResourcePickupMutation.Request) {
			return toast.promise(
				kysely.transaction().execute(async (tx) => {
					const building = await BuildingSource.getOrThrow$({
						tx,
						id: buildingId,
					});
					const resources = await BuildingResourceSource.list$({
						tx,
						where: {
							buildingId,
						},
					});

					for await (const resource of resources) {
						try {
							await InventorySource.create$({
								tx,
								shape: {
									amount: resource.amount,
									resourceId: resource.resourceId,
								},
								entity: {
									amount: resource.amount,
									resourceId: resource.resourceId,
									userId: building.userId,
								},
							});
						} catch (e) {
							const inventory = await InventorySource.fetchOrThrow$({
								tx,
								where: {
									userId: building.userId,
									resourceId: resource.resourceId,
								},
							});

							await InventorySource.patch$({
								tx,
								filter: {
									id: inventory.id,
								},
								shape: {},
								entity: {
									amount: inventory.amount + resource.amount,
								},
							});
						}

						await BuildingResourceSource.delete$({
							tx,
							where: {
								id: resource.id,
							},
						});
					}
				}),
				{
					loading: translator.text("Transferring resources... (label)"),
					success: translator.text(
						"Resources transferred successfully (label)",
					),
					error: translator.text("Failed to transfer resources (label)"),
				},
			);
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
