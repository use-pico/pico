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
	tva = TitlePreviewCls,
	cls,
}) => {
	const classes = tva.create(cls, ({ what }) => ({
		variant: what.variant({
			withSubtitle: Boolean(subtitle),
		}),
	}));

	return (
		<div className={classes.base()}>
			<div className={classes.title()}>
				{icon ? <Icon icon={icon} /> : null}
				{title}
			</div>
			{subtitle ? (
				<div className={classes.subtitle()}>{subtitle}</div>
			) : null}
		</div>
	);
};
