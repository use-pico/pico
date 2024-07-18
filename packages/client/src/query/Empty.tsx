import {
	type CountSchema,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema,
} from "@use-pico/common";
import type { ReactNode } from "react";
import { t } from "../i18n/t";
import { EmptyResultIcon } from "../icon/EmptyResultIcon";
import { QueryResult } from "../query/QueryResult";
import { useCount } from "../query/useCount";
import { Status } from "../ui/Status";
import type { IQueryStore } from "./IQueryStore";
import type { IWithSourceQuery } from "./IWithSourceQuery";

export namespace Empty {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> {
		/**
		 * Query store containing query data for the table.
		 */
		withQueryStore: IQueryStore.Store<TQuerySchema>;
		/**
		 * Query source to fetch data from.
		 */
		withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
		refresh?: number;
		text?: {
			where?: {
				title?: ReactNode;
				message?: ReactNode;
			};
			filter?: {
				title?: ReactNode;
				message?: ReactNode;
			};
			count?: {
				title?: ReactNode;
				message?: ReactNode;
			};
		};
	}
}

export const Empty = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>({
	withQueryStore,
	withSourceQuery,
	refresh,
	text,
}: Empty.Props<TQuerySchema, TSchema>) => {
	const count = useCount({
		store: withQueryStore,
		withSourceQuery,
		refetchInterval: refresh,
	});

	return (
		<QueryResult<CountSchema>
			result={count}
			success={({ entity }) => {
				if (entity.where === 0) {
					return (
						<Status
							icon={EmptyResultIcon}
							text={{
								title: text?.where?.title || t()`No results`,
								message: text?.where?.message || t()`No results (message)`,
							}}
							css={["py-4"]}
						/>
					);
				} else if (entity.count === 0) {
					return (
						<Status
							icon={EmptyResultIcon}
							text={{
								title: text?.filter?.title || t()`No results`,
								message:
									text?.filter?.message || t()`No results (nothing found)`,
							}}
							css={["py-4"]}
						/>
					);
				} else if (entity.total === 0) {
					return (
						<Status
							icon={EmptyResultIcon}
							text={{
								title: text?.count?.title || t()`No results`,
								message: text?.count?.message || t()`No results (message)`,
							}}
							css={["py-4"]}
						/>
					);
				}
				return null;
			}}
		/>
	);
};
