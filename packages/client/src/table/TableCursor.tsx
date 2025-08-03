import { Cursor as CoolCursor } from "../cursor/Cursor";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import type { AbstractList } from "../list/AbstractList";
import type { Table } from "./Table";

export namespace TableCursor {
	export interface Props<TRequest extends AbstractList.Request> {
		cursor: Table.Cursor.Props<TRequest>;
		request: TRequest;
	}
}

export const TableCursor = <TRequest extends AbstractList.Request>({
	cursor: { withCountQuery, onPage, onSize },
	request,
}: TableCursor.Props<TRequest>) => {
	const { data, isSuccess, isLoading, isFetching, isError } =
		withCountQuery.useQuery(request);

	if (isError) {
		return null;
	}

	if (!request.cursor) {
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
			cursor={request.cursor}
			count={data}
			onPage={onPage}
			onSize={onSize}
		/>
	);
};
