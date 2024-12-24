import type { Loader } from "@use-pico/client";
import { type CountSchema } from "@use-pico/common";
import { BlueprintQuery } from "~/app/derivean/blueprint/BlueprintQuery";
import type { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";

export namespace withBlueprintCount {
	export interface Props
		extends Omit<Loader.Props<BlueprintFilterSchema.Type>, "cursor"> {
		//
	}
}

export const withBlueprintCount = ({
	queryClient,
	where,
	filter,
}: withBlueprintCount.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withBlueprintCount", { where, filter }],
		async queryFn(): Promise<CountSchema.Type> {
			return BlueprintQuery.count({
				filter,
				where,
			});
		},
	});
};
