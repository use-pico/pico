import type { Loader } from "@use-pico/client";
import type { CountSchema } from "@use-pico/common";
import type { SlotFilterSchema } from "~/app/derivean/slot/schema/SlotFilterSchema";
import { SlotQuery } from "~/app/derivean/slot/SlotQuery";

export namespace withSlotCount {
	export interface Props
		extends Omit<Loader.Props<SlotFilterSchema.Type>, "cursor"> {
		//
	}
}

export const withSlotCount = async ({
	queryClient,
	where,
	filter,
}: withSlotCount.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withSlotCount", { where, filter }],
		async queryFn(): Promise<CountSchema.Type> {
			return SlotQuery.count({
				filter,
				where,
			});
		},
	});
};
