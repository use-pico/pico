import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, Ref } from "react";
import { ColumnLayoutCls } from "./ColumnLayoutCls";

export namespace ColumnLayout {
	export interface Props extends ColumnLayoutCls.Props<PropsWithChildren> {
		ref?: Ref<HTMLDivElement>;
		layout?: Cls.VariantOf<ColumnLayoutCls, "layout">;
	}
}

export const BaseColumnLayout: FC<ColumnLayout.Props> = ({
	ref,
	layout,
	cls = ColumnLayoutCls,
	tweak,
	children,
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			layout,
		}),
	}));

	return (
		<div
			data-ui="ColumnLayout-root"
			ref={ref}
			className={slots.root()}
		>
			{children}
		</div>
	);
};

export const ColumnLayout = withCls(BaseColumnLayout, ColumnLayoutCls);
