import {
	Css,
	cssOf,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema
} from "@use-pico/common";
import { useDebounce } from "../hook/useDebounce";
import { tx } from "../i18n/tx";
import { useStore } from "../store/useStore";
import { Icon } from "../ui/Icon";
import type { IQueryStore } from "./IQueryStore";

/**
 * Fulltext input connected to a query store for fulltext search.
 *
 * @group ui
 */
export namespace Fulltext {
	/**
	 * Props for `Fulltext`.
	 *
	 * @template TQuerySchema Query schema.
	 */
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> extends Css.Style {
		/**
		 * Query store used by this component.
		 */
		withQueryStore: IQueryStore.Store<TQuerySchema>;
		/**
		 * Text configuration.
		 */
		text?: {
			/**
			 * Placeholder text.
			 */
			placeholder?: string;
		};
		/**
		 * Auto-focus the input.
		 */
		focus?: boolean;
	}
}

export const Fulltext = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
	{
		withQueryStore,
		text,
		focus = false,
		css,
	}: Fulltext.Props<TQuerySchema>
) => {
	const {
		filter,
		shallowFilter,
		setCursor,
	} = useStore(withQueryStore, (
		{
			filter,
			shallowFilter,
			setCursor,
		}) => ({
		filter,
		shallowFilter,
		setCursor,
	}));
	const fulltext = filter?.fulltext;

	const [search, setSearch] = useDebounce(
		fulltext ?? "",
		value => {
			shallowFilter({fulltext: value});
			setCursor(0);
		},
		500
	);

	return <div
		className={cssOf(
			"relative",
			"w-1/3",
		)}
	>
		<div
			className={cssOf(
				"absolute inset-y-0 left-2 flex items-center pointer-events-none",
				"text-slate-500",
			)}
		>
			<Icon
				icon={"icon-[material-symbols-light--search]"}
				size={"xl"}
			/>
		</div>
		<input
			className={cssOf(
				"bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none px-1.5 py-1 pl-8 w-full",
				css,
			)}
			autoFocus={focus}
			value={search}
			placeholder={text?.placeholder || tx()`Fulltext (placeholder)`}
			type={"text"}
			onChange={event => {
				setSearch(event.target.value);
			}}
		/>
		{fulltext && <div
			className={cssOf(
				"absolute inset-y-0 right-2 flex items-center cursor-pointer",
				"text-slate-300 hover:text-slate-500",
			)}
			onClick={() => {
				shallowFilter({fulltext: undefined});
				setSearch("");
				setCursor(0);
			}}
		>
			<Icon
				icon={"icon-[gridicons--cross]"}
				size={"md"}
			/>
		</div>}
	</div>;
};
