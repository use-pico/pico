import {
	type MutationSchema,
	type WithIdentitySchema
}          from "@use-pico/common";
import {z} from "zod";

export const valuesOf = <
	TMutationSchema extends MutationSchema<any, any>,
>(
	entity: WithIdentitySchema.Type | undefined
): z.infer<TMutationSchema> | undefined => {
	return entity ? {
		upsert: {
			with:  entity,
			query: {
				where: {
					id: entity.id,
				},
			},
		},
	} : undefined;
};
