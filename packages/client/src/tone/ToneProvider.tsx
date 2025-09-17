import type { Cls } from "@use-pico/cls";
import { type FC, type PropsWithChildren, useMemo } from "react";
import type { PicoCls } from "../cls/PicoCls";
import { createToneStore } from "./createToneStore";
import { ToneContext } from "./ToneContext";

export namespace ToneProvider {
	export interface Props extends PropsWithChildren {
		/**
		 * Default tone for the context
		 *
		 * @Note value is reactive, but it will trigger re-render of everything
		 */
		tone?: Cls.VariantOf<PicoCls, "tone">;
		/**
		 * Default theme for the context
		 *
		 * @Note value is reactive, but it will trigger re-render of everything
		 */
		theme?: Cls.VariantOf<PicoCls, "theme">;
	}
}

/**
 * Provider component that creates a tone store and provides it via ToneContext.
 *
 * @example
 * ```tsx
 * <ToneProvider tone="danger" theme="dark">
 *   <Button>Inherits danger + dark</Button>
 *   <Button tone="primary">Overrides to primary + dark</Button>
 * </ToneProvider>
 * ```
 */
export const ToneProvider: FC<ToneProvider.Props> = ({
	tone: defaultTone = "unset",
	theme: defaultTheme = "unset",
	children,
}) => {
	const toneStore = useMemo(
		() =>
			createToneStore({
				defaultTone,
				defaultTheme,
			}),
		[
			defaultTone,
			defaultTheme,
		],
	);

	return <ToneContext value={toneStore}>{children}</ToneContext>;
};
