import type { FC, PropsWithChildren, ReactNode } from "react";
import { TabListCls } from "./TabListCls";

export namespace TabList {
	export interface Props extends TabListCls.Props<PropsWithChildren> {
		right?: ReactNode;
	}
}

export const TabList: FC<TabList.Props> = ({
	right,
	variant,
	tva = TabListCls,
	css,
	children,
}) => {
	const tv = tva({
		...variant,
		css,
	}).slots;
	return (
		<div className={tv.base()}>
			<div className={tv.tabs()}>{children}</div>
			{right}
		</div>
	);
};
