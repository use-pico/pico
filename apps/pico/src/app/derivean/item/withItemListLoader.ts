import type { Loader } from "@use-pico/client";
import { ItemQuery } from "~/app/derivean/item/ItemQuery";
import type { ItemFilterSchema } from "~/app/derivean/item/schema/ItemFilterSchema";
import type { ItemSchema } from "~/app/derivean/item/schema/ItemSchema";

export namespace withItemListLoader {
	export interface Props extends Loader.Props<ItemFilterSchema.Type> {
		//
	}
}

export const withItemListLoader = async ({
	queryClient,
	where,
	filter,
	cursor = { page: 0, size: 10 },
}: withItemListLoader.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withItemListLoader", { where, filter, cursor }],
		async queryFn(): Promise<ItemSchema.Type> {
			return ItemQuery.fetch({
				where,
				filter,
				cursor,
			});
		},
	});
};
