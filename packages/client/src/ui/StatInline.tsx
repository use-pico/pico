import { Css, cssOf, toHumanNumber } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { Icon } from "./Icon";

export namespace StatInline {
	export interface Props extends Css.Style {
		icon?: string;
		label: ReactNode;
		count?: number;
	}
}

export const StatInline: FC<StatInline.Props> = ({
	icon,
	label,
	count,
	css,
}) => {
	return (
		<div className={cssOf("flex flex-row items-center gap-2", css)}>
			<div className={cssOf("flex flex-row items-center gap-1", "opacity-80")}>
				{icon ? (
					<Icon
						icon={icon}
						size={"xl"}
					/>
				) : null}
				<div>{label}</div>
			</div>
			<div className={cssOf("font-bold")}>
				{toHumanNumber({ number: count })}
			</div>
		</div>
	);
};
