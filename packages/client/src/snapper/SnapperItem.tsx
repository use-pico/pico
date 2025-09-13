import { useCls, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { SnapperItemCls } from "./SnapperItemCls";
import { useSnapper } from "./useSnapper";

export namespace SnapperItem {
	export interface Props extends SnapperItemCls.Props<PropsWithChildren> {
		disabled?: boolean;
	}
}

export const BaseSnapperItem: FC<SnapperItem.Props> = ({
	disabled,
	cls = SnapperItemCls,
	tweak,
	children,
}) => {
	const { orientation } = useSnapper();
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			orientation,
			disabled,
		}),
	}));

	return <div className={slots.root()}>{children}</div>;
};

export const SnapperItem = withCls(BaseSnapperItem, SnapperItemCls);
