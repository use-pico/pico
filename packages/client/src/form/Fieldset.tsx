import {cn} from "@use-pico/common";
import {
	type FC,
	type PropsWithChildren,
	type ReactNode
}           from "react";

export namespace Fieldset {
	export interface Props extends PropsWithChildren, cn.WithTheme<"root" | "content">, cn.WithClass {
		text: {
			legend: ReactNode;
		};
	}
}

export const Fieldset: FC<Fieldset.Props> = (
	{
		text,
		children,
		theme,
		cx,
	}
) => {
	return <fieldset
		className={cn(
			"border border-slate-200 rounded p-4 w-full shadow-md",
			theme?.root,
			cx,
		)}
	>
		<legend>{text.legend}</legend>
		<div
			className={cn(
				"flex flex-col gap-2",
				theme?.content,
			)}
		>
			{children}
		</div>
	</fieldset>;
};
