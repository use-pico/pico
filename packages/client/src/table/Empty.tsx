"use client";

import {
	cn,
	type CountSchema,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema
}                        from "@use-pico/common";
import type {ReactNode}  from "react";
import {t}               from "../i18n/t";
import {EmptyResultIcon} from "../icon/EmptyResultIcon";
import {QueryResult}     from "../query/QueryResult";
import {useCount}        from "../query/useCount";
import {Status}          from "../ui/Status";
import {Table}           from "./Table";

export namespace Empty {
	export type Props<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> =
		Pick<
			Table.Props<TColumns, TQuerySchema, TSchema>,
			"withSourceQuery" | "withQueryStore" | "refresh"
		>
		& cn.WithClass
		& {
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
		};
}

export const Empty = <
	TColumns extends string,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>(
	{
		withQueryStore,
		withSourceQuery,
		refresh,
		text,
	}: Empty.Props<TColumns, TQuerySchema, TSchema>
) => {
	const count = useCount({
		store:           withQueryStore,
		withSourceQuery,
		refetchInterval: refresh,
	});

	return <QueryResult<CountSchema>
		result={count}
		success={({entity}) => {
			if (entity.where === 0) {
				return <Status
					icon={EmptyResultIcon}
					text={{
						title:   text?.where?.title || t()`No results`,
						message: text?.where?.message || t()`No results (message)`,
					}}
					cx={[
						"py-4",
					]}
				/>;
			} else if (entity.count === 0) {
				return <Status
					icon={EmptyResultIcon}
					text={{
						title:   text?.filter?.title || t()`No results`,
						message: text?.filter?.message || t()`No results (nothing found)`,
					}}
					cx={[
						"py-4",
					]}
				/>;
			} else if (entity.count === 0) {
				return <Status
					icon={EmptyResultIcon}
					text={{
						title:   text?.count?.title || t()`No results`,
						message: text?.count?.message || t()`No results (message)`,
					}}
					cx={[
						"py-4",
					]}
				/>;
			}
			return null;
		}}
	/>;
};
