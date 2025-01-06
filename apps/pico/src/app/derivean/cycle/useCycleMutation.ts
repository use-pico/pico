import { useMutation } from "@tanstack/react-query";
import { useSourceInvalidator } from "@use-pico/client";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingProductionQueueSource } from "~/app/derivean/building/production/BuildingProductionQueueSource";
import { BuildingQueueSource } from "~/app/derivean/building/queue/BuildingQueueSource";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";

export namespace useCycleMutation {
	export interface Props {
		userId: string;
	}
}

export const useCycleMutation = ({ userId }: useCycleMutation.Props) => {
	const invalidator = useSourceInvalidator({
		sources: [
			CycleSource,
			BuildingQueueSource,
			BuildingSource,
			BuildingProductionQueueSource,
			BuildingResourceSource,
		],
	});

	return useMutation({
		mutationKey: ["useCycleMutation"],
		async mutationFn() {
			return CycleSource.db.transaction().execute(async (tx) => {
				await CycleSource.create$({
					tx,
					shape: {},
					entity: {
						userId,
					},
				});

				const { filter: cycles } = await CycleSource.count$({
					tx,
					where: { userId },
				});

				const cycleBuildingQueue = async () => {
					const buildingQueueList = await BuildingQueueSource.list$({
						tx,
						cursor: { page: 0, size: 500 },
						where: {
							userId,
						},
					});

					for await (const queue of buildingQueueList) {
						await BuildingQueueSource.patch$({
							tx,
							entity: {
								current: queue.current + 1,
							},
							shape: {
								current: queue.current + 1,
							},
							where: {
								id: queue.id,
							},
						});
					}

					const finishedBuildingQueueList = await BuildingQueueSource.list$({
						tx,
						cursor: { page: 0, size: 500 },
						where: {
							userId,
							finishGt: cycles,
						},
					});

					for await (const queue of finishedBuildingQueueList) {
						await BuildingSource.create$({
							tx,
							shape: {
								baseBuildingId: queue.baseBuildingId,
							},
							entity: {
								baseBuildingId: queue.baseBuildingId,
								userId,
							},
						});

						await BuildingQueueSource.delete$({
							tx,
							where: {
								id: queue.id,
							},
						});
					}
				};

				const cycleProduction = async () => {
					const queueList = await BuildingProductionQueueSource.list$({
						tx,
						cursor: { page: 0, size: 500 },
						where: {
							userId,
						},
					});

					for await (const queue of queueList) {
						await BuildingProductionQueueSource.patch$({
							tx,
							entity: {
								current: queue.current + 1,
							},
							shape: {
								current: queue.current + 1,
							},
							where: {
								id: queue.id,
							},
						});
					}

					const finishedQueueList = await BuildingProductionQueueSource.list$({
						tx,
						cursor: { page: 0, size: 500 },
						where: {
							userId,
							finishGt: cycles,
						},
					});

					for await (const queue of finishedQueueList) {
						const limit =
							queue.building.baseBuilding.limits.find(
								(limit) => limit.resourceId === queue.resourceId,
							)?.limit || undefined;
						let success = false;

						try {
							if (!limit || queue.amount <= limit) {
								await BuildingResourceSource.create$({
									tx,
									shape: {
										resourceId: queue.resourceId,
										amount: queue.amount,
									},
									entity: {
										buildingId: queue.buildingId,
										resourceId: queue.resourceId,
										amount: queue.amount,
									},
								});
								success = true;
							}
						} catch (_) {
							const item = await BuildingResourceSource.fetchOrThrow$({
								tx,
								where: {
									buildingId: queue.buildingId,
									resourceId: queue.resourceId,
								},
							});

							if (!limit || item.amount + queue.amount <= limit) {
								await BuildingResourceSource.patch$({
									tx,
									entity: {
										amount: item.amount + queue.amount,
									},
									shape: {
										amount: item.amount + queue.amount,
									},
									where: {
										buildingId: queue.buildingId,
										resourceId: queue.resourceId,
									},
								});
								success = true;
							}
						}

						success &&
							(await BuildingProductionQueueSource.delete$({
								tx,
								where: {
									id: queue.id,
								},
							}));
					}
				};

				await cycleBuildingQueue();
				await cycleProduction();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
