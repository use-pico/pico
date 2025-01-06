import { useMutation } from "@tanstack/react-query";
import { useSourceInvalidator } from "@use-pico/client";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingQueueSource } from "~/app/derivean/building/queue/BuildingQueueSource";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";

export namespace useCycleMutation {
	export interface Props {
		userId: string;
	}
}

export const useCycleMutation = ({ userId }: useCycleMutation.Props) => {
	const invalidator = useSourceInvalidator({
		sources: [CycleSource, BuildingQueueSource, BuildingSource],
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

				await cycleBuildingQueue();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
