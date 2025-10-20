import { type Cls, useCls } from "@use-pico/cls";
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
		disabled?: boolean;
		size?: Cls.VariantOf<BadgeCls, "size">;
		tone?: Cls.VariantOf<BadgeCls, "tone">;
		theme?: Cls.VariantOf<BadgeCls, "theme">;
	}
}

export const Badge: FC<Badge.Props> = ({
	ref,
	//
	disabled,
	size,
	tone,
	theme,
	//
	cls = BadgeCls,
	tweak,
	//
	...props
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			disabled,
			size,
			tone,
			theme,
		},
	});

	return (
		<div
			ref={ref}
			data-ui="Badge-root"
			className={slots.root()}
			{...props}
		/>
	);
};
