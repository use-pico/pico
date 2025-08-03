import type {
	CursorSchema,
	EntitySchema,
	FilterSchema,
} from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { match, P } from "ts-pattern";
import { useCls } from "../hooks/useCls";
import { EmptyResultIcon } from "../icon/EmptyResultIcon";
import { ErrorIcon } from "../icon/ErrorIcon";
import { LoaderIcon } from "../icon/LoaderIcon";
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

		export type Render = (props: Props) => ReactNode;
	}

	/**
	 * Represents an error component (only for query, count may silently fail).
	 */
	export namespace Error {
		export type Props = {};

		export type Render = (props: Props) => ReactNode;
	}

	/**
	 * Before the list, physically separated from the body.
	 */
	export namespace Prefix {
		export type Props = {};

		export type Render = (props: Props) => ReactNode;
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

		export type Render<TItem extends EntitySchema.Type> = (
			props: Props<TItem>,
		) => ReactNode;
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

		export type Render<TItem extends EntitySchema.Type> = (
			props: Props<TItem>,
		) => ReactNode;
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

		export type Render<TItem extends EntitySchema.Type> = (
			props: Props<TItem>,
		) => ReactNode;
	}

	export namespace Postfix {
		export type Props = {};

		export type Render = (props: Props) => ReactNode;
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
		renderEmpty?: Empty.Render;
		/**
		 * Error component to display when there is an error.
		 */
		renderError?: Error.Render;
		/**
		 * Item component to display each item.
		 */
		renderItem: Item.Render<TItem>;
		/**
		 * Prefix component to display before the list.
		 */
		renderPrefix?: Prefix.Render;
		/**
		 * Header component to display before the list.
		 */
		renderHeader?: Header.Render<TItem>;
		/**
		 * Footer component to display after the list.
		 */
		renderFooter?: Footer.Render<TItem>;
		/**
		 * Postfix component to display after the list.
		 */
		renderPostfix?: Postfix.Render;
	}

	export type PropsEx<
		TRequest extends Request,
		TItem extends EntitySchema.Type,
	> = Omit<Props<TRequest, TItem>, "renderItem">;

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
	renderEmpty = ({ loading }) => {
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
	},
	renderError = () => {
		return (
			<Status
				icon={ErrorIcon}
				textTitle={<Tx label={"Error"} />}
				textMessage={<Tx label={"Something went wrong."} />}
			/>
		);
	},
	renderItem,
	renderPrefix = () => null,
	renderHeader = () => null,
	renderFooter = () => null,
	renderPostfix = () => null,
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
			{renderPrefix({})}

			<AbstractListBody
				withQuery={withQuery}
				request={request}
				//
				renderHeader={renderHeader}
				renderItem={renderItem}
				renderFooter={renderFooter}
				renderEmpty={renderEmpty}
				renderError={renderError}
				//
				slots={slots}
			/>

			{renderPostfix({})}
		</div>
	);
};
