import type { withRepositorySchema } from "./withRepositorySchema";

export namespace withRepository {
	export interface Props<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
		schema: TSchema;
		toCreate(
			shape: withRepositorySchema.Shape<TSchema>,
		): Promise<Omit<withRepositorySchema.Entity<TSchema>, "id">>;
	}

	export interface Instance<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
		schema: TSchema;
	}
}

export const withRepository = <
	TSchema extends withRepositorySchema.Instance<any, any, any>,
>({
	schema,
}: withRepository.Props<TSchema>): withRepository.Instance<TSchema> => {
	const instance: withRepository.Instance<TSchema> = {
		schema,
	};

	return instance;
};
