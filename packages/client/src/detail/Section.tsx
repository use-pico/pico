import type { ReactNode } from "@tanstack/react-router";
import type { FC } from "react";
import { Icon } from "../icon/Icon";
import { DetailCss } from "./DetailCss";
import { Item } from "./Item";

export namespace Section {
	export interface Props extends DetailCss.Props {
		id: string;
		icon?: string;
		title: ReactNode;
		hidden?: boolean;
		item: Item.Props[];
	}
}

export const Section: FC<Section.Props> = ({
	id: sectionId,
	icon,
	title,
	hidden = false,
	item,
	variant,
	tva = DetailCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return hidden ? null : (
			<fieldset
				key={`section-${sectionId}`}
				className={tv.section()}
			>
				<legend className={tv.legend()}>
					{icon && <Icon icon={icon} />}
					{title}
				</legend>

				{item.map(({ id, ...props }) => (
					<Item
						key={`section-${sectionId}-item-${id}`}
						id={`${sectionId}-${id}`}
						variant={variant}
						tva={tva}
						css={css}
						{...props}
					/>
				))}
			</fieldset>
		);
};
