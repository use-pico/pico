import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { TabListCls } from "./TabListCls";

export namespace TabList {
	export interface Props extends TabListCls.Props<PropsWithChildren> {
		right?: ReactNode;
	}
}

export const TabList: FC<TabList.Props> = ({
	right,
	cls = TabListCls,
	tweak,
	children,
}) => {
	const { slots } = useCls(cls, tweak);

	return (
		<div
			data-ui="TabList-root"
			className={slots.root()}
		>
			<div
				data-ui="TabList-tabs"
				className={slots.tabs()}
			>
				{children}
			</div>
			{right}
		</div>
	);
};
