import type {
	CursorSchema,
	FilterSchema,
	IdentitySchema,
} from "@use-pico/common";
import type { FC } from "react";
import { EmptyResultIcon } from "../icon/EmptyResultIcon";
import { ErrorIcon } from "../icon/ErrorIcon";
import { LoaderIcon } from "../icon/LoaderIcon";
import type { withQuery } from "../source/withQuery";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";
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

		export type Component = FC<Props>;
	}

	/**
	 * Represents an error component (only for query, count may silently fail).
	 */
	export namespace Error {
		export type Component = FC;
	}

	export namespace Prefix {
		export interface Props<TItem extends IdentitySchema.Type> {
			items: TItem[];
		}

		export type Component<TItem extends IdentitySchema.Type> = FC<
			Props<TItem>
		>;
	}

	export namespace Item {
		export interface Props<TItem extends IdentitySchema.Type> {
			item: TItem;
		}

		export type Component<TItem extends IdentitySchema.Type> = FC<
			Props<TItem>
		>;
	}

	export namespace Postfix {
		export interface Props<TItem extends IdentitySchema.Type> {
			items: TItem[];
		}

		export type Component<TItem extends IdentitySchema.Type> = FC<
			Props<TItem>
		>;
	}

	export interface Props<
		TRequest extends Request,
		TItem extends IdentitySchema.Type,
	> extends AbstractListCls.Props {
		/**
		 * Query used to fetch data using the request prop.
		 *
		 * Item IDs are directly used as React key prop, so you've to ensure they're unique.
		 */
		withQuery: withQuery.Api<TRequest, TItem[]>;
		/**
		 * Count used to fetch various info about counts to properly display item counters.
		 */
		withCountQuery: withQuery.Api<TRequest, number>;
		/**
		 * Request used to fetch data; it's assumed change to this prop
		 * triggers a new query request.
		 */
		request: TRequest;
		/**
		 * Empty component to display when there are no items.
		 */
		emptyComponent: Empty.Component;
		/**
		 * Error component to display when there is an error.
		 */
		errorComponent?: Error.Component;
		/**
		 * Item component to display each item.
		 */
		itemComponent: Item.Component<TItem>;
		/**
		 * Prefix component to display before the list.
		 */
		prefixComponent?: Prefix.Component<TItem>;
		/**
		 * Postfix component to display after the list.
		 */
		postfixComponent?: Postfix.Component<TItem>;
	}

	export type Component<
		TRequest extends Request,
		TItem extends IdentitySchema.Type,
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
	TItem extends IdentitySchema.Type,
>({
	withQuery,
	withCountQuery,
	request,
	emptyComponent: EmptyComponent = ({ loading }) => {
		return loading === "loading" ? (
			<Status
				icon={LoaderIcon}
				textTitle={<Tx label={"Loading..."} />}
				textMessage={<Tx label={"Please wait..."} />}
			/>
		) : (
			<Status
				icon={EmptyResultIcon}
				textTitle={<Tx label={"Nothing here"} />}
				textMessage={
					<Tx label={"There is nothing to see right now."} />
				}
			/>
		);
	},
	errorComponent: ErrorComponent = () => {
		return (
			<Status
				icon={ErrorIcon}
				textTitle={<Tx label={"Error"} />}
				textMessage={<Tx label={"Something went wrong."} />}
			/>
		);
	},
	itemComponent: ItemComponent,
	prefixComponent: PrefixComponent = () => null,
	postfixComponent: PostfixComponent = () => null,
	variant,
	tva = AbstractListCls,
	cls,
}: AbstractList.Props<TRequest, TItem>) => {
	const query = withQuery.useQuery(request);
	const countQuery = withCountQuery.useQuery(request);
	const loading: AbstractList.Loading | undefined = query.isLoading
		? "loading"
		: query.isFetching
			? "fetching"
			: undefined;
	const { slots } = tva(variant, cls);
	/**
	 * This is quite un-transparent flow as here we're
	 * checking for an error, which means next is only Success
	 * or Loading.
	 */
	if (query.isError) {
		return <ErrorComponent />;
	}

	/**
	 * Here we're expecting basically only two states - success or
	 * loading as the Error is already resolved here.
	 */
	return (
		<div className={slots.root()}>
			{query.isSuccess ? (
				<>
					<PrefixComponent items={query.data} />

					<div className={slots.items()}>
						{query.data.map((item) => (
							<ItemComponent
								key={item.id}
								item={item}
							/>
						))}
					</div>

					<PostfixComponent items={query.data} />
				</>
			) : (
				<EmptyComponent loading={loading} />
			)}
		</div>
	);
};
