import { useCls, withCls } from "@use-pico/cls";
import { type FC, type ReactNode, useContext } from "react";
import { InlineContext } from "../context/InlineContext";
import { AttrCls } from "./AttrCls";

export namespace Attr {
	export interface Props extends AttrCls.Props {
		inline?: boolean;
		label?: ReactNode;
		value: ReactNode;
	}
}

export const BaseAttr: FC<Attr.Props> = ({
	inline,
	label,
	value,
	tva = AttrCls,
	cls,
}) => {
	const inlineContext = useContext(InlineContext);
	const isInline = inline ?? inlineContext?.inline;
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			inline: isInline,
		}),
	}));

	return (
		<div className={slots.base()}>
			{label ? <div className={slots.label()}>{label}</div> : null}
			<div className={slots.value()}>{value}</div>
		</div>
	);
};

export const Attr = withCls(BaseAttr, AttrCls);
