import type { FC } from "react";
import type { DetailCls } from "./DetailCls";
import { Value } from "./Value";

export namespace Item {
	export interface Props {
		id: string;
		value: Omit<Value.Props, "slots">[];
		slots: DetailCls.Slots;
	}
}

export const Item: FC<Item.Props> = ({ id: itemId, value, slots }) => {
	return (
		<div
			key={`detail-section-item-${itemId}`}
			className={slots.item()}
		>
			{value.map(({ id, ...props }) => (
				<Value
					key={`item-value-${itemId}-${id}`}
					id={`${itemId}-${id}`}
					slots={slots}
					{...props}
				/>
			))}
		</div>
	);
};
