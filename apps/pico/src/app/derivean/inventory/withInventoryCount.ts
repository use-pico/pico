import type { Loader } from "@use-pico/client";
import type { CountSchema } from "@use-pico/common";
import { InventoryQuery } from "~/app/derivean/inventory/InventoryQuery";
import type { InventoryFilterSchema } from "~/app/derivean/inventory/schema/InventoryFilterSchema";

export namespace withInventoryCount {
	export interface Props
		extends Omit<Loader.Props<InventoryFilterSchema.Type>, "cursor"> {
		//
	}
}

export const withInventoryCount = async ({
	queryClient,
	where,
	filter,
}: withInventoryCount.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withInventoryCount", { where, filter }],
		async queryFn(): Promise<CountSchema.Type> {
			return InventoryQuery.count({
				filter,
				where,
			});
		},
	});
};
