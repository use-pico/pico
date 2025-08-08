import type { EntitySchema, withQuerySchema } from "@use-pico/common";
import type { withQuery } from "../source/withQuery";
import type { AbstractList } from "./AbstractList";
import type { AbstractListCls } from "./AbstractListCls";

export namespace AbstractListBody {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> {
		withQuery: withQuery.Api<TQuery, TItem[]>;
		query: TQuery;
		slots: AbstractListCls;
		renderHeader: AbstractList.Header.Render<TItem>;
		renderItem: AbstractList.Item.Render<TItem>;
		renderFooter: AbstractList.Footer.Render<TItem>;
		/**
		 * Empty component to display when there are no items.
		 */
		renderEmpty: AbstractList.Empty.Render;
		/**
		 * Error component to display when there is an error.
		 */
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

	if (isLoading) {
		return renderEmpty({
			loading: "loading",
		});
	}

	if (isError) {
		return renderError({});
	}

	if (isSuccess && data?.length === 0) {
		/**
		 * Loading - undefined means we're empty, but loading is not happening anymore.
		 */
		return renderEmpty({
			loading: undefined,
		});
	}

	/**
	 * This branch should _not_ never happen.
	 *
	 * We'll see....
	 */
	if (!data) {
		return null;
	}

	return (
		<div className={slots.body()}>
			<div className={slots.items()}>
				{renderHeader({
					isFetching,
					items: data,
				})}

				{data.map((item) =>
					renderItem({
						item,
						items: data,
						isFetching,
					}),
				)}

				{renderFooter({
					isFetching,
					items: data,
				})}
			</div>
		</div>
	);
};
