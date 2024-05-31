import {cn} from "@use-pico/common";
import {type FC, type PropsWithChildren, type ReactNode} from "react";
import {Icon} from "./Icon";

export namespace Status {
	export type Props = PropsWithChildren<
		{
			text: {
				title: ReactNode;
				message: ReactNode;
			};
			icon?: string;
		} & cn.WithClass>
}

export const Status: FC<Status.Props> = (
	{
		text,
		icon,
		children,
		cx,
	}
) => {
	return <div
		className={cn(
			"w-full",
			"flex flex-col items-center justify-center",
			cx,
		)}
	>
		{icon ? <Icon
			icon={icon}
			size={"6xl"}
			cx={[
				"text-slate-500",
				"opacity-50",
			]}
		/> : null}
		<div
			className={cn(
				"text-xl",
				"text-bold",
			)}
		>
			{text.title}
		</div>
		<div
			className={cn(
				"text-base",
				"text-slate-500",
			)}
		>
			{text.message}
		</div>
		<div>
			{children}
		</div>
	</div>;
};
