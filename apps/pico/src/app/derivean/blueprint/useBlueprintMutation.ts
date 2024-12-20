import { useMutation } from "@tanstack/react-query";
import { id, isCreateSchema, isPatchSchema } from "@use-pico/common";
import { BlueprintCreateSchema } from "~/app/derivean/blueprint/schema/BlueprintCreateSchema";
import { BlueprintPatchSchema } from "~/app/derivean/blueprint/schema/BlueprintPatchSchema";
import { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import type { BlueprintShapeSchema } from "~/app/derivean/blueprint/schema/BlueprintShapeSchema";
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
				// request.patch.with.kind
				//
			}

			throw new Error("Unknown request");
		},
	});
};
