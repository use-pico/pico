import { useCls } from "@use-pico/cls";
import type { FC } from "react";
import { PagesCls } from "./PagesCls";

export namespace Pages {
	export namespace Event {
		export type OnPage = (page: number) => void;
	}

	export interface Props extends PagesCls.Props {
		pages: number[];
		page: number;
		onPage: Event.OnPage;
	}
}

export const Pages: FC<Pages.Props> = ({
	pages,
	page,
	onPage,
	tva = PagesCls,
	tweak,
}) => {
	const slots = useCls(tva, tweak);

	return (
		<nav className={slots.root()}>
			<ul className={slots.list()}>
				{pages.map((current) => {
					return (
						<li
							key={`page-${current}`}
							className={slots.page(({ what }) => ({
								variant: what.variant({
									current: page === current - 1,
								}),
							}))}
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
