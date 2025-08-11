import { type FC, type ReactNode, useContext } from "react";
import { InlineContext } from "../context/InlineContext";
import { ValueOfCls } from "./ValueOfCls";

export namespace ValueOf {
	export interface Props extends ValueOfCls.Props {
		inline?: boolean;
		label?: ReactNode;
		value: ReactNode;
	}
}

export const ValueOf: FC<ValueOf.Props> = ({
	inline,
	label,
	value,
	tva = ValueOfCls,
	cls,
}) => {
	const inlineStore = useContext(InlineContext);
	const isInline = inline ?? inlineStore?.inline;
	const slots = tva.create(cls, ({ what }) => ({
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
