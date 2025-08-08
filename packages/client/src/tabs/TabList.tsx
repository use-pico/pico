import type { FC, PropsWithChildren, ReactNode } from "react";
import { TabListCls } from "./TabListCls";

export namespace TabList {
	export interface Props extends TabListCls.Props<PropsWithChildren> {
		right?: ReactNode;
	}
}

export const TabList: FC<TabList.Props> = ({
	right,
	tva = TabListCls,
	cls,
	children,
}) => {
	const classes = tva.create(cls);

	return (
		<div className={classes.base}>
			<div className={classes.tabs}>{children}</div>
			{right}
		</div>
	);
};
