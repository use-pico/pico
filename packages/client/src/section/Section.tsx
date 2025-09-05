import { type FC, type ReactNode, useId } from "react";
import type { DetailCls } from "../detail/DetailCls";
import { Item } from "../detail/Item";
import type { Icon } from "../icon/Icon";
import { TitlePreview } from "../title-preview/TitlePreview";

export namespace Section {
	export interface Props {
		icon?: Icon.Type;
		title: ReactNode;
		hidden?: boolean;
		item: Omit<Item.Props, "slots">[];
		slots: DetailCls.Slots;
	}
}

export const Section: FC<Section.Props> = ({
	icon,
	title,
	hidden = false,
	item,
	slots,
}) => {
	const baseId = useId();

	return hidden ? null : (
		<div className={slots.section()}>
			<TitlePreview
				icon={icon}
				title={title}
			/>

			{item.map(({ id, ...props }) => (
				<Item
					key={`${baseId}-${id}`}
					id={`${baseId}-${id}`}
					slots={slots}
					{...props}
				/>
			))}
		</div>
	);
};
