import {cn} from "@use-pico/common";
import {type FC, type HTMLAttributes} from "react";

const cssSize = {
	"xs": "text-xs",
	"sm": "text-sm",
	"md": "text-base",
	"lg": "text-lg",
	"xl": "text-xl",
	"2xl": "text-2xl",
	"3xl": "text-3xl",
	"4xl": "text-4xl",
	"5xl": "text-5xl",
	"6xl": "text-6xl",
} as const;
type cssSize = typeof cssSize;

export namespace Icon {
	export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "className">, cn.WithClass {
		icon: string;
		size?: keyof cssSize;
	}

	export type PropsEx =
		Omit<Props, "icon">
		& Partial<Pick<Props, "icon">>;
}

export const Icon: FC<Icon.Props> = (
	{
		icon,
		size,
		cx,
		...props
	}
) => {
	return <span
		className={cn(
			icon,
			size ? cssSize[size] : false,
			cx,
		)}
		{...props}
	>
	</span>;
};
