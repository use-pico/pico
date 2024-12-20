import { Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AppLayoutCss } from "./AppLayoutCss";
import { Footer } from "./Footer";

export namespace AppLayout {
	export interface Props extends AppLayoutCss.Props {
		/**
		 * Left side in the bar, usually a logo.
		 */
		logo?: ReactNode;
		/**
		 * Right side in the bar, usually a menu.
		 */
		menu?: ReactNode;
		/**
		 * Actions on the right side of the bar.
		 */
		actions?: ReactNode;
	}
}

export const AppLayout: React.FC<AppLayout.Props> = ({
	logo,
	menu,
	actions,
	variant,
	tva = AppLayoutCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			<Toaster
				position={"top-center"}
				closeButton
				richColors
			/>
			<div className={tv.header()}>
				<div>{logo}</div>
				<div className={"flex-grow"}>{menu}</div>
				<div className={"flex flex-row gap-2 items-center"}>{actions}</div>
			</div>
			<div className={tv.content()}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
