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
	variant,
	tva = PagesCls,
	cls,
}) => {
	const { slots } = tva(variant, cls);

	return (
		<nav className={slots.base()}>
			<ul className={slots.list()}>
				{pages.map((current) => {
					return (
						<li
							key={`page-${current}`}
							className={slots.page({
								current: page === current - 1,
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
