import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { InlineContext } from "../context/InlineContext";
import { DetailCls } from "./DetailCls";

export namespace Detail {
	export interface Props extends DetailCls.Props<PropsWithChildren> {
		inline?: boolean;
	}

	export type PropsEx = Omit<Props, "section">;
}

export const Detail: FC<Detail.Props> = ({
	inline = true,
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
			<div className={slots.root()}>{children}</div>
		</InlineContext.Provider>
	);
};
