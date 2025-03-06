import type { FC } from "react";
import { DetailCss } from "./DetailCss";
import { Section } from "./Section";

export namespace Detail {
	export interface Props extends DetailCss.Props {
		section: Section.Props[];
	}
}

export const Detail: FC<Detail.Props> = ({
	section,
	variant,
	tva = DetailCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			{section.map(({ id, ...props }) => (
				<Section
					key={`detail-section-${id}`}
					id={id}
					variant={variant}
					tva={tva}
					css={css}
					{...props}
				/>
			))}
		</div>
	);
};
