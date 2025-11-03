import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, Ref } from "react";
import { DetailCls } from "./DetailCls";

export namespace Detail {
	export interface Props extends DetailCls.Props<PropsWithChildren> {
		ref?: Ref<HTMLDivElement>;
		inline?: boolean;
	}

	export type PropsEx = Omit<Props, "section">;
}

export const Detail: FC<Detail.Props> = ({
	ref,
	// TODO Create store for inlines - if supported
	inline: _inline = false,
	children,
	cls = DetailCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);

	return (
		<div
			data-ui="Detail-root"
			ref={ref}
			className={slots.root()}
		>
			{children}
		</div>
	);
};
