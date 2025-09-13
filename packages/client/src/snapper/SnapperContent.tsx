import { useCls, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { SnapperContentCls } from "./SnapperContentCls";
import { useSnapper } from "./useSnapper";

export namespace SnapperContent {
	export interface Props extends SnapperContentCls.Props<PropsWithChildren> {}
}

export const BaseSnapperContent: FC<SnapperContent.Props> = ({
	cls = SnapperContentCls,
	tweak,
	children,
}) => {
	const { containerRef, orientation } = useSnapper();
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			orientation,
		}),
	}));

	return (
		<div
			ref={containerRef}
			className={slots.root()}
		>
			<div className={slots.content()}>{children}</div>
		</div>
	);
};

export const SnapperContent = withCls(BaseSnapperContent, SnapperContentCls);
