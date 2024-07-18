import {
	CollectionMutationSchema,
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	ShapeSchema,
	WithEntity,
	WithIdentitySchema
}                      from "@use-pico/common";
import {DeleteControl} from "./DeleteControl";

/**
 * Wrapper around {@link DeleteControl} that deletes a single entity. Requires collection mutation.
 *
 * @group ui
 */
export namespace DeleteEntityControl {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TCollectionMutationSchema extends CollectionMutationSchema<ShapeSchema, TQuerySchema>,
	> extends DeleteControl.Props<TQuerySchema, TCollectionMutationSchema>, WithEntity.Schema<WithIdentitySchema> {
	}
}

export const DeleteEntityControl = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TCollectionMutationSchema extends CollectionMutationSchema<ShapeSchema, TQuerySchema>,
>(
	{
		entity,
		...props
	}: DeleteEntityControl.Props<TQuerySchema, TCollectionMutationSchema>
) => {
	return <props.withQueryStore.Provider
		values={{
			where: {
				id: entity.id,
			},
		}}
	>
		<DeleteControl
			{...props}
		/>
	</props.withQueryStore.Provider>;
};
