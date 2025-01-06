import {
    useMutation,
    useQueryClient,
    type QueryClient,
} from "@tanstack/react-query";
import { useRouter, type AnyRouter } from "@tanstack/react-router";
import type { withSource, withSourceSchema } from "@use-pico/common";

export namespace useCreateMutation {
	export namespace toCreate {
		export interface Props<
			TSchema extends withSourceSchema.Instance<any, any, any>,
		> {
			shape: TSchema["~shape"];
		}

		export interface Response<
			TSchema extends withSourceSchema.Instance<any, any, any>,
		> {
			entity: Partial<TSchema["~entity"]>;
		}

		export type Callback<
			TSchema extends withSourceSchema.Instance<any, any, any>,
		> = (props: Props<TSchema>) => Promise<Response<TSchema>>;
	}

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
		toCreate?: toCreate.Callback<TSchema>;
		onSuccess?: onSuccess.Callback<TSchema>;
	}
}

export const useCreateMutation = <
	TDatabase,
	TSchema extends withSourceSchema.Instance<any, any, any>,
>({
	source,
	wrap = async (callback) => callback(),
	toCreate = async ({ shape }) => ({ entity: shape, shape }),
	onSuccess,
}: useCreateMutation.Props<TDatabase, TSchema>) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation<TSchema["~output"], Error, TSchema["~shape"]>({
		mutationKey: ["useCreateMutation", source.name],
		async mutationFn(shape): Promise<TSchema["~output"]> {
			return wrap(async (): Promise<TSchema["~output"]> => {
				return source.db.transaction().execute(async (tx) => {
					const entity = await source.create$({
						tx,
						...(await toCreate({
							shape,
						})),
						shape,
					});

					await onSuccess?.({ queryClient, router, entity });

					return entity;
				});
			});
		},
	});
};