import {
    useMutation,
    useQueryClient,
    type QueryClient,
    type UseMutationOptions,
} from "@tanstack/react-query";
import { useRouter, type AnyRouter } from "@tanstack/react-router";
import type {
    EntitySchema,
    FilterSchema,
    ShapeSchema,
    withSource,
    withSourceSchema,
} from "@use-pico/common";

export namespace usePatchMutation {
	export namespace toPatch {
		export interface Props<
			TSchema extends withSourceSchema.Instance<
				EntitySchema,
				ShapeSchema,
				FilterSchema
			>,
		> {
			shape: TSchema["~shape"];
		}

		export interface Response<
			TSchema extends withSourceSchema.Instance<
				EntitySchema,
				ShapeSchema,
				FilterSchema
			>,
		> extends Omit<withSource.Query<TSchema>, "cursor"> {
			entity?: Partial<TSchema["~entity"]>;
		}

		export type Callback<
			TSchema extends withSourceSchema.Instance<
				EntitySchema,
				ShapeSchema,
				FilterSchema
			>,
		> = (props: Props<TSchema>) => Promise<Response<TSchema>>;
	}

	export namespace onSuccess {
		export interface Props<
			TSchema extends withSourceSchema.Instance<
				EntitySchema,
				ShapeSchema,
				FilterSchema
			>,
		> {
			queryClient: QueryClient;
			router: AnyRouter;
			entity: TSchema["~entity"];
		}

		export type Callback<
			TSchema extends withSourceSchema.Instance<
				EntitySchema,
				ShapeSchema,
				FilterSchema
			>,
		> = (props: Props<TSchema>) => Promise<void>;
	}

	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<
			EntitySchema,
			ShapeSchema,
			FilterSchema
		>,
	> {
		source: withSource.Instance<TDatabase, TSchema>;
		wrap?<T>(callback: () => Promise<T>): Promise<T>;
		toPatch: toPatch.Callback<TSchema>;
		onSuccess?: onSuccess.Callback<TSchema>;
		options?: Omit<
			UseMutationOptions<TSchema["~output"], Error, TSchema["~shape"]>,
			"mutationKey" | "mutationFn"
		>;
	}
}

export const usePatchMutation = <
	TDatabase,
	TSchema extends withSourceSchema.Instance<
		EntitySchema,
		ShapeSchema,
		FilterSchema
	>,
>({
	source,
	wrap = async (callback) => callback(),
	toPatch,
	onSuccess,
	options,
}: usePatchMutation.Props<TDatabase, TSchema>) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation<TSchema["~output"], Error, TSchema["~shape"]>({
		mutationKey: ["usePatchMutation", source.name],
		async mutationFn(shape): Promise<TSchema["~output"]> {
			return wrap(async (): Promise<TSchema["~output"]> => {
				return source.db.transaction().execute(async (tx) => {
					const entity = await source.patch$({
						tx,
						entity: shape,
						shape,
						...(await toPatch({
							shape,
						})),
					});

					await onSuccess?.({ queryClient, router, entity });

					return entity;
				});
			});
		},
		...options,
	});
};
