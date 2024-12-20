import type { Loader } from "@use-pico/client";
import type { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { dexie } from "~/app/derivean/dexie/dexie";

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
			return BlueprintSchema.parse(
				await dexie.Blueprint.where({
					...filter,
					...where,
				}).first(),
			);
		},
	});
};
