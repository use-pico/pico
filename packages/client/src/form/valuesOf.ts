import {
    type MutationSchema,
    type WithIdentitySchema
}          from "@use-pico/common";
import {z} from "zod";

/**
 * Shortcut to create a mutation schema for upserting an entity bound to it's ID.
 *
 * @group form
 *
 * @template TMutationSchema Mutation schema of the form.
 */
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
