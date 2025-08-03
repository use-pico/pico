import type { withQuerySchema } from "@use-pico/common";
import { Cursor as CoolCursor } from "../cursor/Cursor";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import type { TableControl } from "../table-control/TableControl";

export namespace TableCursor {
	export interface Props<TQuery extends withQuerySchema.Query> {
		cursor: TableControl.Cursor.Props<TQuery>;
		query: TQuery;
	}
}

export const TableCursor = <TQuery extends withQuerySchema.Query>({
	cursor: { withCountQuery, onPage, onSize },
	query,
}: TableCursor.Props<TQuery>) => {
	const { data, isSuccess, isLoading, isFetching, isError } =
		withCountQuery.useQuery(query);

	if (isError) {
		return null;
	}

	if (!query.cursor) {
		return null;
	}

	if (isLoading) {
		return <Icon icon={LoaderIcon} />;
	}

	if (!isSuccess) {
		return null;
	}

	return (
		<CoolCursor
			cls={{
				base: isFetching
					? [
							"opacity-50",
						]
					: undefined,
			}}
			cursor={query.cursor}
			count={data}
			onPage={onPage}
			onSize={onSize}
		/>
	);
};
