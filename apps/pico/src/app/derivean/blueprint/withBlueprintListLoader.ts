import type { Loader } from "@use-pico/client";
import { isEmpty, omit } from "@use-pico/common";
import type { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { withBlueprintFilter } from "~/app/derivean/blueprint/withBlueprintFilter";
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
			const $where = {
				...omit(where, ["fulltext"]),
				...omit(filter, ["fulltext"]),
			} as const;

			return (isEmpty($where) ? dexie.Blueprint : dexie.Blueprint.where($where))
				.filter(withBlueprintFilter({ where, filter }))
				.offset(cursor.page * cursor.size)
				.limit(cursor.size)
				.toArray();
		},
	});
};
