import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, HTMLAttributes, Ref } from "react";
import { ToneProvider } from "../tone/ToneProvider";
import { useTone } from "../tone/useTone";
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

export const BaseBadge: FC<Badge.Props> = ({
	ref,
	disabled,
	size,
	tone,
	theme,
	tweak,
	cls = BadgeCls,
	...props
}) => {
	const contextTone = useTone({
		tone,
		theme,
	});

	const { slots } = useCls(cls, tweak, {
		variant: {
			disabled,
			size,
			...contextTone,
		},
	});

	return (
		<ToneProvider {...contextTone}>
			<div
				ref={ref}
				data-ui="Badge-root"
				className={slots.root()}
				{...props}
			/>
		</ToneProvider>
	);
};

export const Badge = withCls(BaseBadge, BadgeCls);
