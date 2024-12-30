import type { QueryClient } from "@tanstack/react-query";
import {
    type CountSchema,
    type CursorSchema,
    type withRepositorySchema,
    withRepository as withCoolRepository,
} from "@use-pico/common";

export namespace withRepository {
	export interface Props<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> extends withCoolRepository.Props<TSchema> {
		name: string;
	}

	export namespace Instance {
		export namespace withFetchLoader {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				queryClient: QueryClient;
				where?: withRepositorySchema.Filter<TSchema>;
				filter?: withRepositorySchema.Filter<TSchema>;
				cursor?: CursorSchema.Type;
			}
		}

		export namespace withListLoader {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				queryClient: QueryClient;
				where?: withRepositorySchema.Filter<TSchema>;
				filter?: withRepositorySchema.Filter<TSchema>;
				cursor?: CursorSchema.Type;
			}
		}

		export namespace withCountLoader {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				queryClient: QueryClient;
				where?: withRepositorySchema.Filter<TSchema>;
				filter?: withRepositorySchema.Filter<TSchema>;
			}
		}
	}

	export interface Instance<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> extends withCoolRepository.Instance<TSchema> {
		name: string;
		withFetchLoader(
			props: Instance.withFetchLoader.Props<TSchema>,
		): Promise<withRepositorySchema.Entity<TSchema>>;
		withListLoader(
			props: Instance.withListLoader.Props<TSchema>,
		): Promise<withRepositorySchema.Entity<TSchema>[]>;
		withCountLoader(
			props: Instance.withCountLoader.Props<TSchema>,
		): Promise<CountSchema.Type>;
	}
}

/**
 * Extended client-side repository support.
 */
export const withRepository = <
	TSchema extends withRepositorySchema.Instance<any, any, any>,
>({
	name,
	...props
}: withRepository.Props<TSchema>): withRepository.Instance<TSchema> => {
	const $coolInstance = withCoolRepository(props);

	const $instance: withRepository.Instance<TSchema> = {
		...$coolInstance,

		name,
		async withListLoader({
			queryClient,
			where,
			filter,
			cursor = { page: 0, size: 10 },
		}) {
			return queryClient.ensureQueryData({
				queryKey: ["withListLoader", name, { where, filter, cursor }],
				async queryFn() {
					return $coolInstance.list({ query: { where, filter, cursor } });
				},
			});
		},
		async withFetchLoader({ queryClient, where, filter, cursor }) {
			return queryClient.ensureQueryData({
				queryKey: ["withFetchLoader", name, { where, filter, cursor }],
				async queryFn() {
					return $coolInstance.fetch({ query: { where, filter, cursor } });
				},
			});
		},
		async withCountLoader({ queryClient, where, filter }) {
			return queryClient.ensureQueryData({
				queryKey: ["withCountLoader", name, { where, filter }],
				async queryFn() {
					return $coolInstance.count({ query: { where, filter } });
				},
			});
		},
	};

	return $instance;
};
