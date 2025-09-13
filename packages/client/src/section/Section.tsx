import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode } from "react";
import type { Icon } from "../icon/Icon";
import { TitlePreview } from "../title-preview/TitlePreview";
import { SectionCls } from "./SectionCls";

export namespace Section {
	export interface Props extends SectionCls.Props<PropsWithChildren> {
		icon?: Icon.Type;
		title: ReactNode;
	}
}

export const Section: FC<Section.Props> = ({
	icon,
	title,
	cls = SectionCls,
	tweak,
	children,
}) => {
	const slots = useCls(cls, tweak);

	return (
		<div
			data-ui="Section-root"
			className={slots.root()}
		>
			<TitlePreview
				icon={icon}
				title={title}
				tweak={({ what }) => ({
					slot: what.slot({
						root: what.css(slots.title()),
					}),
				})}
			/>

			<div
				data-ui="Section-items"
				className={slots.items()}
			>
				{children}
			</div>
		</div>
	);
};
