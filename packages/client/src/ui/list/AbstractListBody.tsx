import type { EntitySchema, withQuerySchema } from "@use-pico/common/schema";
import type { withQuery } from "../../query/withQuery";
import type { AbstractList } from "./AbstractList";
import type { AbstractListCls } from "./AbstractListCls";

export namespace AbstractListBody {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> {
		withQuery: withQuery.Api<TQuery, TItem[]>;
		query: TQuery;
		slots: AbstractListCls.Slots;
		renderHeader: AbstractList.Header.Render<TItem>;
		renderItem: AbstractList.Item.Render<TItem>;
		renderFooter: AbstractList.Footer.Render<TItem>;
		renderEmpty: AbstractList.Empty.Render;
		renderError: AbstractList.Error.Render;
	}
}

export const AbstractListBody = <
	TQuery extends withQuerySchema.Query,
	TItem extends EntitySchema.Type,
>({
	withQuery,
	query,
	slots,
	renderHeader,
	renderItem,
	renderFooter,
	renderEmpty,
	renderError,
}: AbstractListBody.Props<TQuery, TItem>) => {
	const { isSuccess, isLoading, isFetching, isError, data } =
		withQuery.useQuery(query);

	return (
		<div
			data-ui="AbstractList-body"
			className={slots.body()}
		>
			{isLoading && (
				<div
					data-ui="AbstractList-loading"
					key="loading"
				>
					{renderEmpty({
						loading: "loading",
					})}
				</div>
			)}

			{isError && (
				<div
					data-ui="AbstractList-error"
					key="error"
				>
					{renderError({})}
				</div>
			)}

			{isSuccess && data.length > 0 && (
				<div
					data-ui="AbstractList-success"
					key="success"
				>
					<div
						data-ui="AbstractList-items"
						className={slots.items()}
					>
						<div data-ui="AbstractList-header">
							{renderHeader({
								isFetching,
								items: data,
							})}
						</div>

						{data.map((item) => (
							<div
								data-ui="AbstractList-row"
								key={item.id}
							>
								{renderItem({
									item,
									items: data,
									isFetching,
								})}
							</div>
						))}

						<div data-ui="AbstractList-footer">
							{renderFooter({
								isFetching,
								items: data,
							})}
						</div>
					</div>
				</div>
			)}
			{isSuccess && data?.length === 0 && (
				<div
					data-ui="AbstractList-empty"
					key="empty"
				>
					{renderEmpty({
						loading: undefined,
					})}
				</div>
			)}
		</div>
	);
};
