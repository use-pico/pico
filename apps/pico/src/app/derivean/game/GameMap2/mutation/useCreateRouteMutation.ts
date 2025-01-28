import { useMutation } from "@tanstack/react-query";
import { useInvalidator } from "@use-pico/client";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";
import { withBuildingRouteBuilding } from "~/app/derivean/service/withBuildingRouteBuilding";

export namespace useCreateRouteMutation {
	export interface Props {
		mapId: string;
		userId: string;
		fromId: string;
		toId: string;
	}
}

export const useCreateRouteMutation = () => {
	const invalidator = useInvalidator([["GameMap"]]);

	return useMutation({
		async mutationFn({
			mapId,
			userId,
			fromId,
			toId,
		}: useCreateRouteMutation.Props) {
			return kysely.transaction().execute(async (tx) => {
				await tx
					.insertInto("Route")
					.values({ id: genId(), fromId, toId, userId })
					.execute();

				setTimeout(async () => {
					await withBuildingRouteBuilding({
						tx,
						mapId,
						userId,
					});
					await invalidator();
				}, 0);
			});
		},
		async onSuccess() {
			await invalidator();
		},
		onError(error) {
			console.error(error);
		},
	});
};
