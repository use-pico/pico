import type { CountSchema, EntitySchema, StateType } from "@use-pico/common";
import type { Cursor as CoolCursor } from "../cursor/Cursor";
import type { Fulltext as CoolFulltext } from "../fulltext/Fulltext";
import type { AbstractList } from "../list/AbstractList";
import type { withQuery } from "../source/withQuery";
import { Table } from "../table/Table";
import { TablePrefix } from "./TablePrefix";

export namespace TableControl {
	export namespace Fulltext {
		export type Props = StateType<CoolFulltext.Value>;
	}

	export namespace Cursor {
		export interface Props<TRequest extends AbstractList.Request>
			extends Omit<CoolCursor.Props, "count" | "cursor"> {
			/**
			 * Query used to fetch count of items.
			 */
			withCountQuery: withQuery.Api<TRequest, CountSchema.Type>;
		}
	}

	export interface Props<
		TRequest extends AbstractList.Request,
		TData extends EntitySchema.Type,
		TContext = any,
	> extends Table.Props<TRequest, TData, TContext> {
		/**
		 * Configure fulltext search
		 */
		fulltext?: Fulltext.Props;
		cursor?: Cursor.Props<TRequest>;
	}

	export type PropsEx<
		TRequest extends AbstractList.Request,
		TData extends EntitySchema.Type,
		TContext = any,
	> = Omit<
		Props<TRequest, TData, TContext>,
		"columns" | "withQuery" | "withCountQuery" | "context"
	>;
}

export const TableControl = <
	TRequest extends AbstractList.Request,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	fulltext,
	cursor,
	...props
}: TableControl.Props<TRequest, TData, TContext>) => {
	return (
		<Table<TRequest, TData, TContext>
			renderPrefix={(render) => (
				<TablePrefix<TRequest, TContext>
					request={props.request}
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
