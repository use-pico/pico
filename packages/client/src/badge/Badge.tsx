import { type FC, type HTMLAttributes } from "react";
import { BadgeCss } from "./BadgeCss";

/**
 * Simple badge icon; just rounded background with children.
 *
 * @group ui
 */
export namespace Badge {
	export interface Props
		extends BadgeCss.Props<HTMLAttributes<HTMLDivElement>> {
		//
	}
}

export const Badge: FC<Badge.Props> = ({
	variant,
	tva = BadgeCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div
			className={tv.base()}
			{...props}
		/>
	);
};
