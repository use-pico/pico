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
	cls,
}) => {
	const classes = tva.create(cls);

	return (
		<nav className={classes.base}>
			<ul className={classes.list}>
				{pages.map((current) => {
					return (
						<li
							key={`page-${current}`}
							className={
								tva.create(undefined, {
									variant: {
										current: page === current - 1,
									},
								}).page
							}
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
