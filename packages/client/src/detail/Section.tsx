import type { ReactNode } from "@tanstack/react-router";
import type { FC } from "react";
import { Icon } from "../icon/Icon";
import type { DetailCls } from "./DetailCls";
import { Item } from "./Item";

export namespace Section {
	export interface Props {
		id: string;
		icon?: string;
		title: ReactNode;
		hidden?: boolean;
		item: Omit<Item.Props, "slots">[];
		slots: DetailCls.Slots;
	}
}

export const Section: FC<Section.Props> = ({
	id: sectionId,
	icon,
	title,
	hidden = false,
	item,
	slots,
}) => {
	return hidden ? null : (
		<fieldset
			key={`section-${sectionId}`}
			className={slots.section()}
		>
			<legend className={slots.legend()}>
				{icon && <Icon icon={icon} />}
				{title}
			</legend>

			{item.map(({ id, ...props }) => (
				<Item
					key={`section-${sectionId}-item-${id}`}
					id={`${sectionId}-${id}`}
					slots={slots}
					{...props}
				/>
			))}
		</fieldset>
	);
};
