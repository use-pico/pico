import type { Loader } from "@use-pico/client";
import { BlueprintQuery } from "~/app/derivean/blueprint/BlueprintQuery";
import { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";

export namespace withBlueprintListLoader {
	export interface Props extends Loader.Props<BlueprintFilterSchema.Type> {
		//
	}
}

export const withBlueprintListLoader = ({
	queryClient,
	where,
	filter,
	cursor = { page: 0, size: 10 },
}: withBlueprintListLoader.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withBlueprintListLoader", { where, filter, cursor }],
		async queryFn(): Promise<BlueprintSchema.Type[]> {
			return BlueprintQuery.query({
				where,
				filter,
				cursor,
			});
		},
	});
};
