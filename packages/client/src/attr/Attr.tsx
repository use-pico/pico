import { type Cls, useCls } from "@use-pico/cls";
import { type FC, type Ref, useContext } from "react";
import { InlineContext } from "../inline/InlineContext";
import { Typo } from "../typo/Typo";
import type { TypoCls } from "../typo/TypoCls";
import { AttrCls } from "./AttrCls";

export namespace Attr {
	export interface Props extends AttrCls.Props {
		ref?: Ref<HTMLDivElement>;
		label: Typo.Value;
		value: Typo.Value;
		labelProps?: Typo.PropsEx;
		valueProps?: Typo.PropsEx;
		tone?: Cls.VariantOf<TypoCls, "tone">;
		inline?: boolean;
	}
}

export const Attr: FC<Attr.Props> = ({
	ref,
	label,
	value,
	labelProps,
	valueProps,
	tone = "neutral",
	inline,
	cls = AttrCls,
	tweak,
}) => {
	const inlineContext = useContext(InlineContext);
	const { slots } = useCls(
		cls,
		tweak,
		{
			variant: {
				inline,
			},
		},
		{
			variant: {
				inline: inlineContext?.inline,
			},
		},
	);

	return (
		<div
			data-ui="Attr-root"
			ref={ref}
			className={slots.root()}
		>
			<Typo
				label={label}
				size="sm"
				font="normal"
				tone={tone}
				{...labelProps}
			/>
			<Typo
				label={value}
				size="md"
				font="bold"
				tone={tone}
				{...valueProps}
			/>
		</div>
	);
};
