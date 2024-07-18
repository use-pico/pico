import {
	Css,
	cssOf
} from "@use-pico/common";
import {
	type FC,
	type PropsWithChildren
} from "react";

/**
 * Simple badge icon; just rounded background with children.
 *
 * @group ui
 */
export namespace Badge {
	export interface Props extends PropsWithChildren, Css.Style {
	}
}

export const Badge: FC<Badge.Props> = (
	{
		children,
		css,
	}
) => {
	return <div
		className={cssOf(
			"rounded-2xl bg-blue-50",
			"border border-blue-200",
			"text-xs px-4 py-0.5 font-bold",
			css,
		)}
	>
		{children}
	</div>;
};
