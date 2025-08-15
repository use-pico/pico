import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { MenuCls } from "./MenuCls";

export namespace Menu {
	export interface Props extends MenuCls.Props<PropsWithChildren> {
		vertical?: boolean;
	}
}

export const Menu: FC<Menu.Props> = ({
	vertical = false,
	tva = MenuCls,
	cls,
	children,
}) => {
	const classes = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			vertical,
		}),
	}));

	return <div className={classes.root()}>{children}</div>;
};
