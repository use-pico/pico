import { useCls, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, Ref } from "react";
import { useMergeRefs } from "../ref/useMergeRefs";
import { SnapperContentCls } from "./SnapperContentCls";
import { useSnapper } from "./useSnapper";

export namespace SnapperContent {
	export interface Props extends SnapperContentCls.Props<PropsWithChildren> {
		ref?: Ref<HTMLDivElement>;
	}
}

export const BaseSnapperContent: FC<SnapperContent.Props> = ({
	ref,
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
	const refs = useMergeRefs([
		containerRef,
		ref,
	]);

	return (
		<div
			data-ui="SnapperContent-;root"
			ref={refs}
			className={slots.root()}
		>
			<div
				data-ui="SnapperContent-content"
				className={slots.content()}
			>
				{children}
			</div>
		</div>
	);
};

export const SnapperContent = withCls(BaseSnapperContent, SnapperContentCls);
