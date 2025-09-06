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
	cls = MenuCls,
	tweak,
	children,
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			vertical,
		}),
	}));

	return <div className={slots.root()}>{children}</div>;
};
