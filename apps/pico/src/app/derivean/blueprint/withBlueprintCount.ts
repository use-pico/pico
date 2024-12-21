import type { Loader } from "@use-pico/client";
import type { CountSchema } from "@use-pico/common";
import type { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
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
			return {
				filter: await dexie.Blueprint.count(),
				where: await dexie.Blueprint.count(),
				total: await dexie.Blueprint.count(),
			};
		},
	});
};
