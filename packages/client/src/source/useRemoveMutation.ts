import {
    useMutation,
    useQueryClient,
    type QueryClient,
    type UseMutationOptions,
} from "@tanstack/react-query";
import { useRouter, type AnyRouter } from "@tanstack/react-router";
import type { withSource, withSourceSchema } from "@use-pico/common";

export namespace useRemoveMutation {
	export namespace onSuccess {
		export interface Props<
			TSchema extends withSourceSchema.Instance<any, any, any>,
		> {
			queryClient: QueryClient;
			router: AnyRouter;
			entity: TSchema["~entity"];
		}

		export type Callback<
			TSchema extends withSourceSchema.Instance<any, any, any>,
		> = (props: Props<TSchema>) => Promise<void>;
	}

	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> {
		source: withSource.Instance<TDatabase, TSchema>;
		wrap?<T>(callback: () => Promise<T>): Promise<T>;
		onSuccess?: onSuccess.Callback<TSchema>;
		options?: Omit<
			UseMutationOptions<
				TSchema["~output"],
				Error,
				Omit<withSource.Query<TSchema>, "cursor">
			>,
			"mutationKey" | "mutationFn"
		>;
	}
}

export const useRemoveMutation = <
	TDatabase,
	TSchema extends withSourceSchema.Instance<any, any, any>,
>({
	source,
	wrap = (callback) => callback(),
	onSuccess,
	options,
}: useRemoveMutation.Props<TDatabase, TSchema>) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation<
		TSchema["~output"],
		Error,
		Omit<withSource.Query<TSchema>, "cursor">
	>({
		mutationKey: ["useRemoveMutation", source.name],
		async mutationFn({ where, filter }): Promise<TSchema["~output"]> {
			return wrap(async (): Promise<TSchema["~output"]> => {
				return source.db.transaction().execute(async (tx) => {
					const entity = await source.delete$({ tx, where, filter });

					await onSuccess?.({ queryClient, router, entity });

					return entity;
				});
			});
		},
		...options,
	});
};
