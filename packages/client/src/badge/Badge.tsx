import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, HTMLAttributes, Ref } from "react";
import { BadgeCls } from "./BadgeCls";

/**
 * Simple badge icon; just rounded background with children.
 *
 * @group ui
 */
export namespace Badge {
	export interface Props
		extends BadgeCls.Props<HTMLAttributes<HTMLDivElement>> {
		ref?: Ref<HTMLDivElement>;
		size?: Cls.VariantOf<BadgeCls, "size">;
		tone?: Cls.VariantOf<BadgeCls, "tone">;
		theme?: Cls.VariantOf<BadgeCls, "theme">;
	}
}

export const BaseBadge: FC<Badge.Props> = ({
	ref,
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
			ref={ref}
			data-ui="Badge-root"
			className={slots.root()}
			{...props}
		/>
	);
};

export const Badge = withCls(BaseBadge, BadgeCls);
