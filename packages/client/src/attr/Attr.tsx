import { useCls, type VariantOf, withCls } from "@use-pico/cls";
import { type FC, useContext } from "react";
import { InlineContext } from "../context/InlineContext";
import { Typo } from "../typo/Typo";
import type { TypoCls } from "../typo/TypoCls";
import { AttrCls } from "./AttrCls";

export namespace Attr {
	export interface Props extends AttrCls.Props {
		label: Typo.Value;
		value: Typo.Value;
		labelProps?: Typo.PropsEx;
		valueProps?: Typo.PropsEx;
		tone?: VariantOf<TypoCls, "tone">;
		inline?: boolean;
	}
}

export const BaseAttr: FC<Attr.Props> = ({
	label,
	value,
	labelProps,
	valueProps,
	tone = "neutral",
	inline,
	tva = AttrCls,
	cls,
}) => {
	const inlineContext = useContext(InlineContext);
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			inline: inline ?? inlineContext?.inline,
		}),
	}));

	return (
		<div className={slots.root()}>
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

export const Attr = withCls(BaseAttr, AttrCls);
