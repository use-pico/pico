import { Css, cssOf } from "@use-pico/common";
import { type FC, type PropsWithChildren, type ReactNode } from "react";
import { Icon } from "./Icon";

export namespace Status {
	export interface Props extends PropsWithChildren, Css.Style {
		text: {
			title: ReactNode;
			message: ReactNode;
		};
		icon?: string;
	}
}

export const Status: FC<Status.Props> = ({ text, icon, children, css }) => {
	return (
		<div
			className={cssOf(
				"w-full",
				"flex flex-col items-center justify-center",
				css,
			)}
		>
			{icon ?
				<Icon
					icon={icon}
					size={"6xl"}
					css={["text-slate-500", "opacity-50"]}
				/>
			:	null}
			<div className={cssOf("text-xl", "text-bold")}>{text.title}</div>
			<div className={cssOf("text-base", "text-slate-500")}>{text.message}</div>
			<div className={"pt-2"}>{children}</div>
		</div>
	);
};
