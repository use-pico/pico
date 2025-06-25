import type { FC, PropsWithChildren } from "react";
import { MenuCls } from "./MenuCls";

export namespace Menu {
	export interface Props extends MenuCls.Props<PropsWithChildren> {
		//
	}
}

export const Menu: FC<Menu.Props> = ({
	variant,
	tva = MenuCls,
	cls,
	children,
}) => {
	const { slots } = tva(variant, cls);

	return <div className={slots.base()}>{children}</div>;
};
