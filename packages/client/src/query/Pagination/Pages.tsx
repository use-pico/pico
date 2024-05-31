import {cn}      from "@use-pico/common";
import {type FC} from "react";

export namespace Pages {
	export interface Props {
		pages: number[];
		page: number;

		onPage(page: number): void;
	}
}

export const Pages: FC<Pages.Props> = (
	{
		pages,
		page,
		onPage,
	}
) => {
	return <nav
		className={cn(
			"select-none",
		)}
	>
		<ul
			className={cn(
				"flex items-center -space-x-px text-xs gap-2",
			)}
		>
			{pages.map((current, index) => {
				return <li
					key={`page-${current}-${index}`}
					className={cn(
						"flex items-center justify-center w-12 px-2 py-1 rounded",
						"border border-slate-200",
						"hover:bg-slate-200",
						"cursor-pointer",
						"transition-all",
						"duration-200",
						{
							"bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold": page === (current - 1),
						},
					)}
					onClick={() => onPage(current - 1)}
				>
					{current}
				</li>;
			})}
		</ul>
	</nav>;
};
