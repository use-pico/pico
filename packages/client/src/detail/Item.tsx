import type { FC } from "react";
import { DetailCss } from "./DetailCss";
import { Value } from "./Value";

export namespace Item {
	export interface Props extends DetailCss.Props {
		id: string;
		value: Value.Props[];
	}
}

export const Item: FC<Item.Props> = ({
	id: itemId,
	value,
	variant,
	tva = DetailCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div
			key={`detail-section-item-${itemId}`}
			className={tv.item()}
		>
			{value.map(({ id, ...props }) => (
				<Value
					key={`item-value-${itemId}-${id}`}
					id={`${itemId}-${id}`}
					variant={variant}
					tva={tva}
					css={css}
					{...props}
				/>
			))}
		</div>
	);
};
