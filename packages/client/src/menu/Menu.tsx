import type { FC, PropsWithChildren } from "react";
import { MenuCls } from "./MenuCls";

export namespace Menu {
	export interface Props extends MenuCls.Props<PropsWithChildren> {
		//
	}
}

export const Menu: FC<Menu.Props> = ({ tva = MenuCls, cls, children }) => {
	const classes = tva.create(cls);

	return <div className={classes.base}>{children}</div>;
};
