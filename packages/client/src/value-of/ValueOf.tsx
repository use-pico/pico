import { useContext, type FC, type ReactNode } from "react";
import { InlineContext } from "../context/InlineContext";
import { ValueOfCss } from "./ValueOfCss";

export namespace ValueOf {
	export interface Props extends ValueOfCss.Props {
		inline?: boolean;
		label?: ReactNode;
		value: ReactNode;
	}
}

export const ValueOf: FC<ValueOf.Props> = ({
	inline,
	label,
	value,
	variant,
	tva = ValueOfCss,
	css,
}) => {
	const inlineStore = useContext(InlineContext);
	const isInline = inline ?? inlineStore?.inline;
	const tv = tva({ inline: isInline, ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			{label ?
				<div className={tv.label()}>{label}</div>
			:	null}
			<div className={tv.value()}>{value}</div>
		</div>
	);
};
