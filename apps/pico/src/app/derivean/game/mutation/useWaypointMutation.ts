import { useMutation } from "@tanstack/react-query";
import { kysely } from "~/app/derivean/db/kysely";

export namespace useWaypointMutation {
	export interface Props {
		id: string;
		x: number;
		y: number;
	}
}

export const useWaypointMutation = () => {
	return useMutation({
		async mutationFn({ id, x, y }: useWaypointMutation.Props) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.updateTable("Waypoint")
					.set({ x, y })
					.where("id", "=", id)
					.execute();
			});
		},
	});
};
