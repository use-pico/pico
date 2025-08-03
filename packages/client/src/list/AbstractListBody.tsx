import type { cls, EntitySchema } from "@use-pico/common";
import { renderSlot } from "../slot/renderSlot";
import type { withQuery } from "../source/withQuery";
import type { AbstractList } from "./AbstractList";
import type { AbstractListCls } from "./AbstractListCls";

export namespace AbstractListBody {
	export interface Props<
		TRequest extends AbstractList.Request,
		TItem extends EntitySchema.Type,
	> {
		withQuery: withQuery.Api<TRequest, TItem[]>;
		request: TRequest;
		slots: cls.Slots<typeof AbstractListCls>;
		headerSlot: AbstractList.Header.Slot<TItem>;
		itemSlot: AbstractList.Item.Slot<TItem>;
		footerSlot: AbstractList.Footer.Slot<TItem>;
		/**
		 * Empty component to display when there are no items.
		 */
		emptySlot: AbstractList.Empty.Slot;
		/**
		 * Error component to display when there is an error.
		 */
		errorSlot: AbstractList.Error.Slot;
	}
}

export const AbstractListBody = <
	TRequest extends AbstractList.Request,
	TItem extends EntitySchema.Type,
>({
	withQuery,
	request,
	slots,
	headerSlot,
	itemSlot,
	footerSlot,
	emptySlot,
	errorSlot,
}: AbstractListBody.Props<TRequest, TItem>) => {
	const { isSuccess, isLoading, isFetching, isError, data } =
		withQuery.useQuery(request);

	if (isLoading) {
		return renderSlot(emptySlot, {
			loading: "loading",
		});
	}

	if (isError) {
		return renderSlot(errorSlot, {});
	}

	if (isSuccess && data?.length === 0) {
		/**
		 * Loading - undefined means we're empty, but loading is not happening anymore.
		 */
		return renderSlot(emptySlot, {
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
		<div className={slots.items()}>
			{renderSlot(headerSlot, {
				isFetching,
				items: data,
			})}

			{data.map((item) =>
				renderSlot(
					itemSlot,
					{
						item,
						items: data,
						isFetching,
					},
					item.id,
				),
			)}

			{renderSlot(footerSlot, {
				isFetching,
				items: data,
			})}
		</div>
	);
};
