import {
	cssOf,
	type SpotlightQuerySchema,
	type SpotlightSchema,
} from "@use-pico/common";
import { useRef, useState, type FC } from "react";
import { useDebounce } from "../hook/useDebounce";
import { useHotkeys } from "../hotkey/useHotkeys";
import { tx } from "../i18n/tx";
import type { IWithSourceQuery } from "../query/IWithSourceQuery";
import { useStore } from "../store/useStore";
import { Icon } from "../ui/Icon";
import { Results } from "./Results";
import { SpotlightQueryStore } from "./SpotlightQueryStore";

const SPOTLIGHT_DEBOUNCE = 200;
const SPOTLIGHT_FOCUS = 100;
const SPOTLIGHT_RESET = 100;

export namespace Search {
	export interface Props {
		withSourceQuery: IWithSourceQuery<SpotlightQuerySchema, SpotlightSchema>;
		hotkeys: string[];
		handlers: Results.Handlers;
		text?: {
			placeholder?: string;
		};
	}
}

export const Search: FC<Search.Props> = ({
	withSourceQuery,
	hotkeys,
	handlers,
	text,
}) => {
	const queryStore = useStore(
		SpotlightQueryStore,
		({ filter, shallowFilter }) => ({
			filter,
			shallowFilter,
		}),
	);
	const searchRef = useRef<HTMLInputElement>(null);
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useDebounce(
		queryStore.filter?.fulltext || "",
		(value) => {
			queryStore.shallowFilter({
				typeIn: Object.keys(handlers),
				fulltext: value,
			});
		},
		SPOTLIGHT_DEBOUNCE,
	);

	const onSpotlight = () => {
		setVisible(true);
		setTimeout(() => {
			searchRef.current?.focus();
		}, SPOTLIGHT_FOCUS);
		document.body.classList.add("overflow-y-hidden");
	};
	const onClose = () => {
		setVisible(false);
		/**
		 * Preventing visible text reset by delay when closing a spotlight.
		 */
		setTimeout(() => {
			setSearch("");
		}, SPOTLIGHT_RESET);
		document.body.classList.remove("overflow-y-hidden");
	};

	useHotkeys(hotkeys.map((hotkey) => [hotkey, onSpotlight]));
	useHotkeys([["esc", onClose]]);

	return (
		<div
			className={cssOf(
				"fixed inset-0 h-full invisible",
				"bg-slate-600 bg-opacity-0 backdrop-blur-none",
				"flex flex-col gap-4",
				"transition-all duration-200",
				"z-[100]",
				"px-24 py-24",
				visible && "visible bg-opacity-50 backdrop-blur-sm",
			)}
			onClick={onClose}
		>
			{/*
			Search input
		*/}
			<div
				className={cssOf(
					"transition-all opacity-0 duration-200",
					"bg-slate-100 p-2 rounded-md",
					visible && "visible opacity-100",
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={cssOf("relative")}>
					<div
						className={cssOf(
							"absolute inset-y-0 left-3 flex items-center pointer-events-none",
							"text-slate-500",
						)}
					>
						<Icon
							icon={"icon-[material-symbols-light--search]"}
							size={"3xl"}
						/>
					</div>
					<input
						className={cssOf(
							"text-slate-900 text-xl border border-slate-300 rounded focus:border-sky-400 focus:outline-none px-3 py-2 pl-12 w-full",
						)}
						value={search}
						placeholder={text?.placeholder || tx()`Spotlight placeholder`}
						type={"text"}
						ref={searchRef}
						onChange={(event) => setSearch(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								onClose();
							}
						}}
					/>
				</div>
			</div>

			<div
				className={cssOf(
					"transition-all opacity-0 duration-200",
					visible && "visible opacity-100",
				)}
			>
				{/*
                Results
            */}
				<Results
					withSourceQuery={withSourceQuery}
					handlers={handlers}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};
