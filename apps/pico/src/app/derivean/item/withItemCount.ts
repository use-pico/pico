import type { Loader } from "@use-pico/client";
import type { CountSchema } from "@use-pico/common";
import { ItemQuery } from "~/app/derivean/item/ItemQuery";
import type { ItemFilterSchema } from "~/app/derivean/item/schema/ItemFilterSchema";

export namespace withItemCount {
	export interface Props
		extends Omit<Loader.Props<ItemFilterSchema.Type>, "cursor"> {
		//
	}
}

export const withItemCount = ({
	queryClient,
	where,
	filter,
}: withItemCount.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withItemCount", { where, filter }],
		async queryFn(): Promise<CountSchema.Type> {
			return ItemQuery.count({
				filter,
				where,
			});
		},
	});
};
