import { type FC, type PropsWithChildren, type ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { StatusCss } from "./StatusCss";

export namespace Status {
	export interface Props extends StatusCss.Props<PropsWithChildren> {
		textTitle: ReactNode;
		textMessage: ReactNode;
		icon?: Icon.Props["icon"];
		iconProps?: Icon.PropsEx;
	}
}

export const Status: FC<Status.Props> = ({
	textTitle,
	textMessage,
	icon,
	iconProps,
	variant,
	tva = StatusCss,
	css,
	children,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			{icon ?
				<Icon
					icon={icon}
					variant={{ size: "6xl" }}
					css={{ base: ["text-slate-500", "opacity-50"] }}
					{...iconProps}
				/>
			:	null}
			<div className={tv.title()}>{textTitle}</div>
			<div className={tv.message()}>{textMessage}</div>
			<div className={tv.body()}>{children}</div>
		</div>
	);
};
