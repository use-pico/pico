import type {
	CountSchema,
	EntitySchema,
	withQuerySchema,
} from "@use-pico/common";
import type { Cursor as CoolCursor } from "../cursor/Cursor";
import type { Fulltext as CoolFulltext } from "../fulltext/Fulltext";
import type { withQuery } from "../source/withQuery";
import { Table } from "../table/Table";
import { TablePrefix } from "./TablePrefix";

export namespace TableControl {
	export namespace Fulltext {
		export type Props = CoolFulltext.State;
	}

	export namespace Cursor {
		export interface Props<TQuery extends withQuerySchema.Query> {
			/**
			 * Query used to fetch count of items.
			 */
			withCountQuery: withQuery.Api<TQuery, CountSchema.Type>;
			state: CoolCursor.State;
		}
	}

	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> extends Table.Props<TQuery, TData, TContext> {
		/**
		 * Configure fulltext search
		 */
		fulltext?: Fulltext.Props;
		cursor?: Cursor.Props<TQuery>;
	}

	export type PropsEx<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> = Omit<
		Props<TQuery, TData, TContext>,
		"columns" | "withQuery" | "withCountQuery" | "context"
	>;
}

export const TableControl = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	fulltext,
	cursor,
	...props
}: TableControl.Props<TQuery, TData, TContext>) => {
	return (
		<Table<TQuery, TData, TContext>
			renderPrefix={(render) => (
				<TablePrefix<TQuery, TContext>
					query={props.query}
					cursor={cursor}
					fulltext={fulltext}
					context={props.context}
					{...render}
				/>
			)}
			{...props}
		/>
	);
};
