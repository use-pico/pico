import { type FC, type PropsWithChildren, type ReactNode } from "react";
import { TabListCss } from "./TabListCss";

export namespace TabList {
	export interface Props extends TabListCss.Props<PropsWithChildren> {
		right?: ReactNode;
	}
}

export const TabList: FC<TabList.Props> = ({
	right,
	variant,
	tva = TabListCss,
	css,
	children,
}) => {
	const tv = tva({ ...variant, css }).slots;
	return (
		<div className={tv.base()}>
			<div className={tv.tabs()}>{children}</div>
			{right}
		</div>
	);
};
