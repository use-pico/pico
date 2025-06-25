import type { FC, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { TitlePreviewCls } from "./TitlePreviewCls";

export namespace TitlePreview {
	export interface Props extends TitlePreviewCls.Props {
		icon?: string;
		title: ReactNode;
		subtitle?: ReactNode;
	}
}

export const TitlePreview: FC<TitlePreview.Props> = ({
	icon,
	title,
	subtitle,
	variant,
	tva = TitlePreviewCls,
	cls,
}) => {
	const { slots } = tva(
		{
			withSubtitle: Boolean(subtitle),
			...variant,
		},
		cls,
	);

	return (
		<div className={slots.base()}>
			<div className={slots.title()}>
				{icon ? <Icon icon={icon} /> : null}
				{title}
			</div>
			{subtitle ? (
				<div className={slots.subtitle()}>{subtitle}</div>
			) : null}
		</div>
	);
};
