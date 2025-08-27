import { useCls } from "@use-pico/cls";
import type { FC, HTMLAttributes } from "react";
import { BadgeCls } from "./BadgeCls";

/**
 * Simple badge icon; just rounded background with children.
 *
 * @group ui
 */
export namespace Badge {
	export interface Props
		extends BadgeCls.Props<HTMLAttributes<HTMLDivElement>> {}
}

export const Badge: FC<Badge.Props> = ({ cls, tva = BadgeCls, ...props }) => {
	const slots = useCls(tva, cls);

	return (
		<div
			className={slots.root()}
			{...props}
		/>
	);
};
