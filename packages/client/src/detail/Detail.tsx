import type { FC } from "react";
import { DetailCls } from "./DetailCls";
import { Section } from "./Section";

export namespace Detail {
	export interface Props extends DetailCls.Props {
		section: Omit<Section.Props, "slots">[];
	}
}

export const Detail: FC<Detail.Props> = ({
	section,
	variant,
	tva = DetailCls,
	css,
}) => {
	const { slots } = tva({
		...variant,
		css,
	});

	return (
		<div className={slots.base()}>
			{section.map(({ id, ...props }) => (
				<Section
					key={`detail-section-${id}`}
					id={id}
					slots={slots}
					{...props}
				/>
			))}
		</div>
	);
};
