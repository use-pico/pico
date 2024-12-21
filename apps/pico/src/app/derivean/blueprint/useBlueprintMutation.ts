import { useMutation, useQueryClient } from "@tanstack/react-query";
import { id, isCreateSchema, isPatchSchema, omit } from "@use-pico/common";
import { BlueprintCreateSchema } from "~/app/derivean/blueprint/schema/BlueprintCreateSchema";
import { BlueprintPatchSchema } from "~/app/derivean/blueprint/schema/BlueprintPatchSchema";
import { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import type { BlueprintShapeSchema } from "~/app/derivean/blueprint/schema/BlueprintShapeSchema";
import { withBlueprintFilter } from "~/app/derivean/blueprint/withBlueprintFilter";
import { withBlueprintLoader } from "~/app/derivean/blueprint/withBlueprintLoader";
import { dexie } from "~/app/derivean/dexie/dexie";

export namespace useBlueprintMutation {
	export interface Props {
		toRequest(
			shape: BlueprintShapeSchema.Type,
		): BlueprintCreateSchema.Type | BlueprintPatchSchema.Type;
	}
}

export const useBlueprintMutation = ({
	toRequest,
}: useBlueprintMutation.Props) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["useBlueprintMutation"],
		async mutationFn(
			shape: BlueprintShapeSchema.Type,
		): Promise<BlueprintSchema.Type> {
			const request = toRequest(shape);

			if (isCreateSchema(BlueprintCreateSchema, request)) {
				const $id = id();

				await dexie.Blueprint.add({
					id: $id,
					...request.create,
				});

				return BlueprintSchema.parse(await dexie.Blueprint.get($id));
			} else if (isPatchSchema(BlueprintPatchSchema, request)) {
				dexie.Blueprint.where({
					...omit(request.patch.filter, ["fulltext"]),
				})
					.filter(withBlueprintFilter({ filter: request.patch.filter }))
					.modify(request.patch.with);

				return withBlueprintLoader({
					queryClient,
					filter: request.patch.filter,
				});
			}

			throw new Error("Unknown request");
		},
	});
};
