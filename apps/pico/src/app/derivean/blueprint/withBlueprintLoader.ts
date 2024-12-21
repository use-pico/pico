import type { Loader } from "@use-pico/client";
import { BlueprintQuery } from "~/app/derivean/blueprint/BlueprintQuery";
import type { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";

export namespace withBlueprintLoader {
	export interface Props extends Loader.Props<BlueprintFilterSchema.Type> {
		//
	}
}

export const withBlueprintLoader = ({
	queryClient,
	where,
	filter,
	cursor = { page: 0, size: 10 },
}: withBlueprintLoader.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["withBlueprintLoader", { where, filter, cursor }],
		async queryFn(): Promise<BlueprintSchema.Type> {
			return BlueprintQuery.fetch({
				where,
				filter,
				cursor,
			});
		},
	});
};
