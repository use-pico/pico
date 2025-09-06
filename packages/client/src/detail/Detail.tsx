import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { DetailCls } from "./DetailCls";

export namespace Detail {
	export interface Props extends DetailCls.Props<PropsWithChildren> {
		//
	}

	export type PropsEx = Omit<Props, "section">;
}

export const Detail: FC<Detail.Props> = ({
	children,
	cls = DetailCls,
	tweak,
}) => {
	const slots = useCls(cls, tweak);

	return <div className={slots.root()}>{children}</div>;
};
