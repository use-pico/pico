import { useCls, type VariantOf } from "@use-pico/cls";
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
		size?: VariantOf<BadgeCls, "size">;
		tone?: VariantOf<BadgeCls, "tone">;
		theme?: VariantOf<BadgeCls, "theme">;
	}
}

export const Badge: FC<Badge.Props> = ({
	size,
	tone,
	theme,
	cls,
	tva = BadgeCls,
	...props
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			size,
			tone,
			theme,
		}),
	}));

	return (
		<div
			className={slots.root()}
			{...props}
		/>
	);
};
