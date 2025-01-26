import { useMutation } from "@tanstack/react-query";
import { useInvalidator } from "@use-pico/client";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";

export namespace useCreateRouteMutation {
	export interface Props {
		userId: string;
		fromId: string;
		toId: string;
	}
}

export const useCreateRouteMutation = () => {
	const invalidator = useInvalidator([["GameMap"]]);

	return useMutation({
		async mutationFn({ userId, fromId, toId }: useCreateRouteMutation.Props) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Route")
					.values({ id: genId(), fromId, toId, userId })
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
