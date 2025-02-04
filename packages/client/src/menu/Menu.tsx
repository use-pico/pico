import { memo, PropsWithChildren, type FC } from "react";
import { MenuCss } from "./MenuCss";

export namespace Menu {
	export interface Props extends MenuCss.Props<PropsWithChildren> {}
}

export const Menu: FC<Menu.Props> = memo(({
	variant,
	tva = MenuCss,
	css,
	children,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return <div className={tv.base()}>{children}</div>;
});
