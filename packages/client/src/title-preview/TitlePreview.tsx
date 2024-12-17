import type { FC, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { TitlePreviewCss } from "./TitlePreviewCss";

export namespace TitlePreview {
	export interface Props extends TitlePreviewCss.Props {
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
	tva = TitlePreviewCss,
	css,
}) => {
	const tv = tva({ withSubtitle: Boolean(subtitle), ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			<div className={tv.title()}>
				{icon ?
					<Icon icon={icon} />
				:	null}
				{title}
			</div>
			{subtitle ?
				<div className={tv.subtitle()}>{subtitle}</div>
			:	null}
		</div>
	);
};
