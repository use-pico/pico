import { useMutation } from "@tanstack/react-query";
import { useInvalidator } from "@use-pico/client";
import { kysely } from "~/app/derivean/db/kysely";

export namespace useBuildingMutation {
	export interface Props {
		id: string;
		x: number;
		y: number;
	}
}

export const useBuildingMutation = () => {
	const invalidator = useInvalidator([["GameMap"]]);

	return useMutation({
		async mutationFn({ id, x, y }: useBuildingMutation.Props) {
			return kysely.transaction().execute(async (tx) => {
				await tx
					.updateTable("Building")
					.set({ x, y })
					.where("id", "=", id)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
