import type { FC, PropsWithChildren } from "react";
import { MenuCss } from "./MenuCss";

export namespace Menu {
	export interface Props extends MenuCss.Props<PropsWithChildren> {}
}

export const Menu: FC<Menu.Props> = ({
	variant,
	tva = MenuCss,
	css,
	children,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return <div className={tv.base()}>{children}</div>;
};
