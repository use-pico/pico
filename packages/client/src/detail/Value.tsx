import type { ReactNode } from "@tanstack/react-router";
import type { FC } from "react";
import { DetailCss } from "./DetailCss";

export namespace Value {
	export interface Props extends DetailCss.Props {
		id: string;
		label?: ReactNode;
		value: ReactNode;
	}
}

export const Value: FC<Value.Props> = ({
	id,
	label,
	value,
	variant,
	tva = DetailCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div
			key={`detail-section-item-value-${id}`}
			className={tv.value()}
		>
			{label ?
				<label className={tv.label()}>{label}</label>
			:	null}
			<div className={tv.field()}>{value}</div>
		</div>
	);
};
