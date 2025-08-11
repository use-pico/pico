import type { FC, ReactNode } from "react";
import type { DetailCls } from "./DetailCls";

export namespace Value {
	export interface Props {
		id: string;
		label?: ReactNode;
		value: ReactNode;
		slots: DetailCls.Slots;
	}
}

export const Value: FC<Value.Props> = ({ id, label, value, slots }) => {
	return (
		<div
			key={`detail-section-item-value-${id}`}
			className={slots.value()}
		>
			{label ? (
				<label
					htmlFor={`detail-section-item-value-${id}`}
					className={slots.label()}
				>
					{label}
				</label>
			) : null}
			<div className={slots.field()}>{value}</div>
		</div>
	);
};
