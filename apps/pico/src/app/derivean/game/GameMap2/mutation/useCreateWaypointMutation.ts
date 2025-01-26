import { useMutation } from "@tanstack/react-query";
import { useInvalidator } from "@use-pico/client";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";

export namespace useCreateWaypointMutation {
	export interface Props {
		userId: string;
		mapId: string;
		x: number;
		y: number;
	}
}

export const useCreateWaypointMutation = () => {
	const invalidator = useInvalidator([["GameMap"]]);

	return useMutation({
		async mutationFn({ userId, mapId, x, y }: useCreateWaypointMutation.Props) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Waypoint")
					.values({
						id: genId(),
						userId,
						mapId,
						x,
						y,
					})
					.returning("id")
					.executeTakeFirstOrThrow();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
