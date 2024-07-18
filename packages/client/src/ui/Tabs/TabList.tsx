import { cssOf, type Css } from "@use-pico/common";
import { type FC, type PropsWithChildren, type ReactNode } from "react";

export namespace TabList {
	export interface Props extends PropsWithChildren, Css.Style {
		right?: ReactNode;
	}
}

export const TabList: FC<TabList.Props> = ({ right, css, children }) => {
	return (
		<div className={"flex flex-row items-center justify-between"}>
			<div className={cssOf("flex flex-row items-center gap-4 mb-4", css)}>
				{children}
			</div>
			{right}
		</div>
	);
};
