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
	cls = TitlePreviewCls,
	tweak,
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			withSubtitle: Boolean(subtitle),
		}),
	}));

	return (
		<div className={slots.root()}>
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
