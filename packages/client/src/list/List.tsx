import {
	Css,
	cssOf,
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema,
} from "@use-pico/common";
import { type FC } from "react";
import type { z } from "zod";
import { Empty } from "../query/Empty";
import { Fulltext } from "../query/Fulltext";
import type { IQueryStore } from "../query/IQueryStore";
import { IWithQuery } from "../query/IWithQuery";
import type { IWithSourceQuery } from "../query/IWithSourceQuery";
import { Pagination } from "../query/Pagination";
import { QueryProgress } from "../query/QueryProgress";
import { Refresh } from "../query/Refresh";
import { RemoveFilter } from "../query/RemoveFilter";
import { createSelectionStore } from "../selection/createSelectionStore";
import type { IStore } from "../store/IStore";
import { Body } from "./Body";

/**
 * Where table is not applicable, comes List!
 *
 * Styled component connected to {@link IQueryStore} and {@link IWithSourceQuery} to fetch and render data.
 *
 * @group ui
 */
export namespace List {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Css<"root" | "item"> {
		/**
		 * Query store containing query data for the table.
		 */
		withQueryStore: IQueryStore.Store<TQuerySchema>;
		/**
		 * Query source to fetch data from.
		 */
		withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
		/**
		 * When selection is enabled, table will provide selection support.
		 */
		selectionStore?: IStore.Store<
			createSelectionStore.StoreProps<z.infer<TSchema>>
		>;
		/**
		 * Item renderer component.
		 */
		render: FC<{
			entity: z.infer<TSchema>;
		}>;
		options?: IWithQuery.QueryOptions<z.ZodArray<TSchema>>;
	}
}

export const List = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>({
	withQueryStore,
	withSourceQuery,
	render,
	options,
	css,
}: List.Props<TQuerySchema, TSchema>) => {
	return (
		<>
			<div
				className={cssOf(
					"flex items-center justify-between border-b border-slate-200",
				)}
			>
				<Fulltext withQueryStore={withQueryStore} />
				<div
					className={cssOf("flex flex-row items-center justify-center gap-2")}
				>
					<Pagination
						withQueryStore={withQueryStore}
						withSourceQuery={withSourceQuery}
						css={["mb-1"]}
					/>
					<Refresh
						withQueryStore={withQueryStore}
						withSourceQuery={withSourceQuery}
					/>
					<RemoveFilter
						withQueryStore={withQueryStore}
						withSourceQuery={withSourceQuery}
					/>
				</div>
			</div>
			<QueryProgress
				withQueryStore={withQueryStore}
				withSourceQuery={withSourceQuery}
			/>
			<div className={cssOf("relative overflow-x-auto")}>
				<Body
					withQueryStore={withQueryStore}
					withSourceQuery={withSourceQuery}
					render={render}
					css={css}
					options={options}
				/>
				<Empty
					withQueryStore={withQueryStore}
					withSourceQuery={withSourceQuery}
				/>
			</div>
			<div className={cssOf("flex flex-row items-center justify-end gap-2")}>
				<Pagination
					withQueryStore={withQueryStore}
					withSourceQuery={withSourceQuery}
					css={["mt-1"]}
				/>
				<Refresh
					withQueryStore={withQueryStore}
					withSourceQuery={withSourceQuery}
				/>
				<RemoveFilter
					withQueryStore={withQueryStore}
					withSourceQuery={withSourceQuery}
				/>
			</div>
		</>
	);
};
