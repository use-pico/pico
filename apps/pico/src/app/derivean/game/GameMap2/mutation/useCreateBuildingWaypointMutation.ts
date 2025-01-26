import { useMutation } from "@tanstack/react-query";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";

export namespace useCreateBuildingWaypointMutation {
	export interface Props {
		buildingId: string;
		waypointId: string;
	}
}

export const useCreateBuildingWaypointMutation = () => {
	return useMutation({
		async mutationFn({
			buildingId,
			waypointId,
		}: useCreateBuildingWaypointMutation.Props) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Building_Waypoint")
					.values({
						id: genId(),
						buildingId,
						waypointId,
					})
					.execute();
			});
		},
	});
};
