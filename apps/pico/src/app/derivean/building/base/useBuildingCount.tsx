import { useQuery } from "@tanstack/react-query";
import { kysely } from "~/app/derivean/db/db";

export namespace useBuildingCount {
	export interface Props {
		baseBuildingId: string;
		userId: string;
	}
}

export const useBuildingCount = ({
	baseBuildingId,
	userId,
}: useBuildingCount.Props) => {
	return useQuery({
		queryKey: ["useBuildingCount", baseBuildingId, userId],
		async queryFn() {
			return kysely.transaction().execute(async (tx) => {
				// const { filter: buildingCount } = await BuildingSource.count$({
				// 	tx,
				// 	filter: {
				// 		baseBuildingId,
				// 		userId,
				// 	},
				// });
				// const { filter: queueCount } = await BuildingQueueSource.count$({
				// 	tx,
				// 	filter: {
				// 		baseBuildingId,
				// 		userId,
				// 	},
				// });

				return {
					count: -1,
					queue: -1,
					total: -1,
				};
			});
		},
	});
};
