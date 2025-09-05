import { useCls } from "@use-pico/cls";
import type { FC, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { TitlePreviewCls } from "./TitlePreviewCls";

export namespace TitlePreview {
	export interface Props extends TitlePreviewCls.Props {
		icon?: Icon.Type;
		title: ReactNode;
		subtitle?: ReactNode;
	}
}

export const TitlePreview: FC<TitlePreview.Props> = ({
	icon,
	title,
	subtitle,
	tva = TitlePreviewCls,
	cls,
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			withSubtitle: Boolean(subtitle),
		}),
	}));

	return (
		<div className={slots.base()}>
			<div className={slots.title()}>
				<Icon
					icon={icon}
					size={"sm"}
				/>
				{title}
			</div>
			{subtitle ? (
				<div className={slots.subtitle()}>{subtitle}</div>
			) : null}
		</div>
	);
};
