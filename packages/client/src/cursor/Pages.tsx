import { type FC } from "react";
import { PagesCss } from "./PagesCss";

export namespace Pages {
	export interface Props extends PagesCss.Props {
		pages: number[];
		page: number;

		onPage(page: number): void;
	}
}

export const Pages: FC<Pages.Props> = ({
	pages,
	page,
	onPage,
	variant,
	tva = PagesCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<nav className={tv.base()}>
			<ul className={tv.list()}>
				{pages.map((current, index) => {
					return (
						<li
							key={`page-${current}-${index}`}
							className={tv.page({
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
