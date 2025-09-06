import { type Cls, useCls } from "@use-pico/cls";
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
		size?: Cls.VariantOf<BadgeCls, "size">;
		tone?: Cls.VariantOf<BadgeCls, "tone">;
		theme?: Cls.VariantOf<BadgeCls, "theme">;
	}
}

export const Badge: FC<Badge.Props> = ({
	size,
	tone,
	theme,
	tweak,
	cls = BadgeCls,
	...props
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
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
