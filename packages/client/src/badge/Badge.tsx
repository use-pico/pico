import type { FC, HTMLAttributes } from "react";
import { BadgeCls } from "./BadgeCls";

/**
 * Simple badge icon; just rounded background with children.
 *
 * @group ui
 */
export namespace Badge {
	export interface Props
		extends BadgeCls.Props<HTMLAttributes<HTMLDivElement>> {
		//
	}
}

export const Badge: FC<Badge.Props> = ({
	variant,
	tva = BadgeCls,
	css,
	...props
}) => {
	const { slots } = tva({
		...variant,
		css,
	});

	return (
		<div
			className={slots.base()}
			{...props}
		/>
	);
};
