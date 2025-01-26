import { useMutation } from "@tanstack/react-query";
import { useInvalidator } from "@use-pico/client";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";
import { withBuildingRouteBuilding } from "~/app/derivean/service/withBuildingRouteBuilding";

export namespace useCreateBuildingWaypointMutation {
	export interface Props {
		mapId: string;
		userId: string;
		buildingId: string;
		waypointId: string;
	}
}

export const useCreateBuildingWaypointMutation = () => {
	const invalidator = useInvalidator([["GameMap"]]);

	return useMutation({
		async mutationFn({
			mapId,
			userId,
			buildingId,
			waypointId,
		}: useCreateBuildingWaypointMutation.Props) {
			return kysely.transaction().execute(async (tx) => {
				await tx
					.insertInto("Building_Waypoint")
					.values({
						id: genId(),
						buildingId,
						waypointId,
					})
					.execute();

				return withBuildingRouteBuilding({
					tx,
					mapId,
					userId,
				});
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
