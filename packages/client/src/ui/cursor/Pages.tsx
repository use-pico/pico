import { useCls } from "@use-pico/cls";
import type { FC, Ref } from "react";
import { PagesCls } from "./PagesCls";

export namespace Pages {
	export namespace Event {
		export type OnPage = (page: number) => void;
	}

	export interface Props extends PagesCls.Props {
		ref?: Ref<HTMLDivElement>;
		pages: number[];
		page: number;
		onPage: Event.OnPage;
	}
}

export const Pages: FC<Pages.Props> = ({
	ref,
	pages,
	page,
	onPage,
	cls = PagesCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);

	return (
		<nav
			data-ui="Pages-root"
			ref={ref}
			className={slots.root()}
		>
			<ul
				data-ui="Pages-list"
				className={slots.list()}
			>
				{pages.map((current) => {
					return (
						<li
							key={`page-${current}`}
							data-ui="Pages-page"
							className={slots.page({
								variant: {
									current: page === current - 1,
								},
							})}
							onClick={() => onPage(current - 1)}
						>
							{current}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
