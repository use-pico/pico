import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, Ref } from "react";
import { InlineContext } from "../context/InlineContext";
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
	inline = false,
	children,
	cls = DetailCls,
	tweak,
}) => {
	const slots = useCls(cls, tweak);

	return (
		<InlineContext.Provider
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
		</InlineContext.Provider>
	);
};
