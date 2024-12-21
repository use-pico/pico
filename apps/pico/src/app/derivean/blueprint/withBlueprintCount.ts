import type { Loader } from "@use-pico/client";
import { isEmpty, omit, type CountSchema } from "@use-pico/common";
import type { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import { withBlueprintFilter } from "~/app/derivean/blueprint/withBlueprintFilter";
import { dexie } from "~/app/derivean/dexie/dexie";

export namespace withBlueprintCount {
	export interface Props extends Loader.Props<BlueprintFilterSchema.Type> {
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
			const $where = {
				...omit(where, ["fulltext"]),
			} as const;
			const $filter = {
				...$where,
				...omit(filter, ["fulltext"]),
			} as const;

			return {
				filter: await (
					isEmpty($filter) ?
						dexie.Blueprint
					:	dexie.Blueprint.where($filter))
					.filter(withBlueprintFilter({ filter, where }))
					.count(),
				where: await (
					isEmpty($where) ?
						dexie.Blueprint
					:	dexie.Blueprint.where($where))
					.filter(withBlueprintFilter({ filter }))
					.count(),
				total: await dexie.Blueprint.count(),
			};
		},
	});
};
