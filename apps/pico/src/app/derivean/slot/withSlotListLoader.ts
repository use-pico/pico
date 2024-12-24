import type { Loader } from "@use-pico/client";
import type { SlotFilterSchema } from "~/app/derivean/slot/schema/SlotFilterSchema";
import type { SlotSchema } from "~/app/derivean/slot/schema/SlotSchema";
import { SlotQuery } from "~/app/derivean/slot/SlotQuery";

export namespace withSlotListLoader {
	export interface Props extends Loader.Props<SlotFilterSchema.Type> {
		//
	}
}

export const withSlotListLoader = async ({
	queryClient,
	where,
	filter,
	cursor = { page: 0, size: 10 },
}: withSlotListLoader.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withSlotListLoader", { where, filter, cursor }],
		async queryFn(): Promise<SlotSchema.Type[]> {
			return SlotQuery.query({
				where,
				filter,
				cursor,
			});
		},
	});
};
