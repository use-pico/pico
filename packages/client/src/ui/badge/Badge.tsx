import type { ComponentProps, FC } from "react";
import { uiBadge } from "./uiBadge";

/**
 * Simple badge icon; just rounded background with children.
 *
 * @group ui
 */
export namespace Badge {
	export interface Props extends uiBadge.Component<ComponentProps<"div">> {
		//
	}
}

export const Badge: FC<Badge.Props> = ({ ui, className, ...props }) => {
	return (
		<div
			{...uiBadge({
				ui,
				className,
			})}
			{...props}
		/>
	);
};
