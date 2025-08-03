import type {
	CursorSchema,
	EntitySchema,
	FilterSchema,
} from "@use-pico/common";
import type { ComponentType, FC } from "react";
import { match, P } from "ts-pattern";
import { useCls } from "../hooks/useCls";
import { EmptyResultIcon } from "../icon/EmptyResultIcon";
import { ErrorIcon } from "../icon/ErrorIcon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { renderSlot } from "../slot/renderSlot";
import { slot } from "../slot/Slot";
import type { withQuery } from "../source/withQuery";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";
import { AbstractListBody } from "./AbstractListBody";
import { AbstractListCls } from "./AbstractListCls";

export namespace AbstractList {
	/**
	 * Base shape of request required for a Queries to handle.
	 */
	export interface Request {
		/**
		 * Paging support
		 */
		cursor?: CursorSchema.Type;
		/**
		 * User-land filters (e.g. from the UI and so on)
		 */
		filter?: FilterSchema.Type;
		/**
		 * System filters, e.g. pre-set userId, clientId and this kind
		 * of stuff which a common user cannot change.
		 */
		where?: FilterSchema.Type;
	}

	/**
	 * Loading state this component understands.
	 */
	export type Loading = "fetching" | "loading";

	/**
	 * Represents an empty component when there are no data available.
	 */
	export namespace Empty {
		export interface Props {
			loading: Loading | undefined;
		}

		export type Slot = slot.Slot<ComponentType<any>, Props>;
	}

	/**
	 * Represents an error component (only for query, count may silently fail).
	 */
	export namespace Error {
		export type Props = {};

		export type Slot = slot.Slot<ComponentType<any>, Props>;
	}

	/**
	 * Before the list, physically separated from the body.
	 */
	export namespace Prefix {
		export type Props = {};

		export type Slot = slot.Slot<ComponentType<any>, Props>;
	}

	/**
	 * Header is literally rendered just before the list (in the same div).
	 */
	export namespace Header {
		export interface Props<TItem extends EntitySchema.Type> {
			/**
			 * We've data already rendered, but there is another batch being fetched.
			 */
			isFetching: boolean;
			items: TItem[];
		}

		export type Slot<TItem extends EntitySchema.Type> = slot.Slot<
			ComponentType<any>,
			Props<TItem>
		>;
	}

	export namespace Item {
		export interface Props<TItem extends EntitySchema.Type> {
			/**
			 * We've data already rendered, but there is another batch being fetched.
			 *
			 * You can use this flag to e.g. mark a row as loading or so.
			 */
			isFetching: boolean;
			item: TItem;
			items: TItem[];
		}

		export type Slot<TItem extends EntitySchema.Type> = slot.Slot<
			ComponentType<any>,
			Props<TItem>
		>;
	}

	/**
	 * After the list, in the same div.
	 */
	export namespace Footer {
		export interface Props<TItem extends EntitySchema.Type> {
			/**
			 * We've data already rendered, but there is another batch being fetched.
			 */
			isFetching: boolean;
			items: TItem[];
		}

		export type Slot<TItem extends EntitySchema.Type> = slot.Slot<
			ComponentType<any>,
			Props<TItem>
		>;
	}

	export namespace Postfix {
		export type Props = {};

		export type Slot = slot.Slot<ComponentType<any>, Props>;
	}

	export interface Props<
		TRequest extends Request,
		TItem extends EntitySchema.Type,
	> extends AbstractListCls.Props {
		/**
		 * Query used to fetch data using the request prop.
		 *
		 * Item IDs are directly used as React key prop, so you've to ensure they're unique.
		 */
		withQuery: withQuery.Api<TRequest, TItem[]>;
		/**
		 * Request used to fetch data; it's assumed change to this prop
		 * triggers a new query request.
		 */
		request: TRequest;
		/**
		 * Empty component to display when there are no items.
		 */
		emptySlot?: Empty.Slot;
		/**
		 * Error component to display when there is an error.
		 */
		errorSlot?: Error.Slot;
		/**
		 * Item component to display each item.
		 */
		itemSlot: Item.Slot<TItem>;
		/**
		 * Prefix component to display before the list.
		 */
		prefixSlot?: Prefix.Slot;
		/**
		 * Header component to display before the list.
		 */
		headerSlot?: Header.Slot<TItem>;
		/**
		 * Footer component to display after the list.
		 */
		footerSlot?: Footer.Slot<TItem>;
		/**
		 * Postfix component to display after the list.
		 */
		postfixSlot?: Postfix.Slot;
	}

	export type PropsEx<
		TRequest extends Request,
		TItem extends EntitySchema.Type,
	> = Omit<Props<TRequest, TItem>, "itemSlot">;

	export type Component<
		TRequest extends Request,
		TItem extends EntitySchema.Type,
	> = FC<Props<TRequest, TItem>>;
}

/**
 * This component is just a simple wrapper around a list of items.
 *
 * If you want more complex component, you should wrap this one into your own
 * implementation.
 *
 * You can use even this component, just it's a bit low-level.
 */
export const AbstractList = <
	TRequest extends AbstractList.Request,
	TItem extends EntitySchema.Type,
>({
	withQuery,
	request,
	emptySlot = slot<
		ComponentType<AbstractList.Empty.Props>,
		AbstractList.Empty.Props
	>(({ loading }) => {
		return match(loading)
			.with("fetching", () => {
				return null;
			})
			.with("loading", () => {
				return (
					<Status
						icon={LoaderIcon}
						textTitle={<Tx label={"Loading..."} />}
						textMessage={<Tx label={"Please wait..."} />}
					/>
				);
			})
			.with(P.nullish, () => {
				return (
					<Status
						icon={EmptyResultIcon}
						textTitle={<Tx label={"Nothing here"} />}
						textMessage={
							<Tx label={"There is nothing to see right now."} />
						}
					/>
				);
			})
			.exhaustive();
	}, {}),
	errorSlot = slot<
		ComponentType<AbstractList.Error.Props>,
		AbstractList.Error.Props
	>(() => {
		return (
			<Status
				icon={ErrorIcon}
				textTitle={<Tx label={"Error"} />}
				textMessage={<Tx label={"Something went wrong."} />}
			/>
		);
	}, {}),
	itemSlot,
	prefixSlot = {
		Component: () => null,
		props: {},
	},
	headerSlot = {
		Component: () => null,
		props: {},
	},
	footerSlot = {
		Component: () => null,
		props: {},
	},
	postfixSlot = {
		Component: () => null,
		props: {},
	},
	variant,
	tva = AbstractListCls,
	cls,
}: AbstractList.Props<TRequest, TItem>) => {
	const { slots } = useCls(tva, variant, cls);

	/**
	 * Here we're expecting basically only two states - success or
	 * loading as the Error is already resolved here.
	 */
	return (
		<div className={slots.root()}>
			{renderSlot(prefixSlot, {})}

			<AbstractListBody
				withQuery={withQuery}
				request={request}
				//
				headerSlot={headerSlot}
				itemSlot={itemSlot}
				footerSlot={footerSlot}
				emptySlot={emptySlot}
				errorSlot={errorSlot}
				//
				slots={slots}
			/>

			{renderSlot(postfixSlot, {})}
		</div>
	);
};
