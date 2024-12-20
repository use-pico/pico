import type { Loader } from "@use-pico/client";
import type { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { dexie } from "~/app/derivean/dexie/dexie";

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
			return dexie.Blueprint.limit(cursor.size)
				.offset(cursor.page * cursor.size)
				.toArray();
		},
	});
};
