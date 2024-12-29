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
				cursor?: CursorSchema.Type;
			}
		}
	}

	export interface Instance<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
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
	const instance: withRepository.Instance<TSchema> = {
		...withCoolRepository(props),
		name,
		async withListLoader(props) {
			return [];
		},
		async withFetchLoader(props) {
			return (await instance.withListLoader(props))?.[0];
		},
		async withCountLoader(props) {
			return {
				filter: -1,
				total: -1,
				where: -1,
			};
		},
	};

	return instance;
};
