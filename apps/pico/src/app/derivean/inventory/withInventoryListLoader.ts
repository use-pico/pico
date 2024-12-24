import type { Loader } from "@use-pico/client";
import { InventoryQuery } from "~/app/derivean/inventory/InventoryQuery";
import type { InventorySchema } from "~/app/derivean/inventory/schema/InventorySchema";

export namespace withInventoryListLoader {
	export interface Props extends Loader.Props<InventorySchema.Type> {
		//
	}
}

export const withInventoryListLoader = async ({
	queryClient,
	where,
	filter,
	cursor = { page: 0, size: 10 },
}: withInventoryListLoader.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withInventoryListLoader", { where, filter, cursor }],
		async queryFn(): Promise<InventorySchema.Type[]> {
			return InventoryQuery.query({
				where,
				filter,
				cursor,
			});
		},
	});
};
