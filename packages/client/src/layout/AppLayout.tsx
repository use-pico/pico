import { Outlet } from "@tanstack/react-router";
import type { PropsWithChildren, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { AppLayoutCls } from "./AppLayoutCls";

export namespace AppLayout {
	export interface Props extends AppLayoutCls.Props<PropsWithChildren> {
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
	tva = AppLayoutCls,
	cls,
	children,
}) => {
	const { slots } = tva(variant, cls);

	return (
		<div className={slots.base()}>
			<Toaster position={"top-right"} />
			<div className={slots.header()}>
				<div>{logo}</div>
				<div className={"grow"}>{menu}</div>
				<div className={"flex flex-row gap-2 items-center"}>
					{actions}
				</div>
			</div>
			<div className={slots.content()}>{children ?? <Outlet />}</div>
		</div>
	);
};
