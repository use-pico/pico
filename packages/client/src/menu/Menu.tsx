import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, Ref } from "react";
import { MenuCls } from "./MenuCls";

export namespace Menu {
	export interface Props extends MenuCls.Props<PropsWithChildren> {
		ref?: Ref<HTMLDivElement>;
		vertical?: boolean;
	}
}

export const Menu: FC<Menu.Props> = ({
	ref,
	vertical = false,
	cls = MenuCls,
	tweak,
	children,
}) => {
	const { slots } = useCls(cls, [
		tweak,
		{
			variant: {
				vertical,
			},
		},
	]);

	return (
		<div
			data-ui="Menu-root"
			ref={ref}
			className={slots.root()}
		>
			{children}
		</div>
	);
};
