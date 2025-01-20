import { useParams } from "@tanstack/react-router";
import { CloseIcon, Icon, LinkTo } from "@use-pico/client";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { PanelCss } from "~/app/derivean/game/GameMap2/PanelCss";

export namespace Panel {
	export interface Props extends PanelCss.Props<PropsWithChildren> {
		icon: string;
		textTitle: ReactNode;
	}

	export type PropsEx = Omit<Props, "icon" | "textTitle">;
}

export const Panel: FC<Panel.Props> = ({
	icon,
	textTitle,
	variant,
	tva = PanelCss,
	css,
	children,
}) => {
	const { locale } = useParams({ from: "/$locale" });
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			<div className={tv.title()}>
				<div className={"flex flex-row gap-2 items-center font-bold"}>
					<Icon
						icon={icon}
						css={{ base: ["text-slate-400"] }}
					/>
					{textTitle}
				</div>
				<LinkTo
					icon={CloseIcon}
					to={"/$locale/apps/derivean/map"}
					params={{ locale }}
				></LinkTo>
			</div>
			<div className={tv.content()}>{children}</div>
		</div>
	);
};
