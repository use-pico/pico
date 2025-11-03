import { useCls } from "@use-pico/cls";
import type { FC, ReactNode, Ref } from "react";
import { Icon } from "../../icon/Icon";
import { TitlePreviewCls } from "./TitlePreviewCls";

export namespace TitlePreview {
	export interface Props extends TitlePreviewCls.Props {
		ref?: Ref<HTMLDivElement>;
		icon?: Icon.Type;
		title: ReactNode;
		subtitle?: ReactNode;
	}
}

export const TitlePreview: FC<TitlePreview.Props> = ({
	ref,
	icon,
	title,
	subtitle,
	cls = TitlePreviewCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			withSubtitle: Boolean(subtitle),
		},
	});

	return (
		<div
			data-ui="TitlePreview-root"
			ref={ref}
			className={slots.root()}
		>
			<div
				data-ui="TitlePreview-title"
				className={slots.title()}
			>
				<Icon
					icon={icon}
					size={"sm"}
				/>
				{title}
			</div>
			{subtitle ? (
				<div
					data-ui="TitlePreview-subtitle"
					className={slots.subtitle()}
				>
					{subtitle}
				</div>
			) : null}
		</div>
	);
};
