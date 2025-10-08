import { useCls, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, Ref } from "react";
import { InlineContext } from "../inline/InlineContext";
import { DetailCls } from "./DetailCls";

export namespace Detail {
	export interface Props extends DetailCls.Props<PropsWithChildren> {
		ref?: Ref<HTMLDivElement>;
		inline?: boolean;
	}

	export type PropsEx = Omit<Props, "section">;
}

const BaseDetail: FC<Detail.Props> = ({
	ref,
	inline = false,
	children,
	cls = DetailCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);

	return (
		<InlineContext
			value={{
				inline,
			}}
		>
			<div
				data-ui="Detail-root"
				ref={ref}
				className={slots.root()}
			>
				{children}
			</div>
		</InlineContext>
	);
};
export const Detail = withCls(BaseDetail, DetailCls);
