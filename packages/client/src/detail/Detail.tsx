import type { FC } from "react";
import { DetailCls } from "./DetailCls";
import { Section } from "./Section";

export namespace Detail {
	export interface Props extends DetailCls.Props {
		section: Omit<Section.Props, "slots">[];
	}
}

export const Detail: FC<Detail.Props> = ({ section, tva = DetailCls, cls }) => {
	const classes = tva.create(cls);

	return (
		<div className={classes.base}>
			{section.map(({ id, ...props }) => (
				<Section
					key={`detail-section-${id}`}
					id={id}
					slots={classes}
					{...props}
				/>
			))}
		</div>
	);
};
