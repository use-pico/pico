import { type FC } from "react";
import { BlockProvider } from "../provider/BlockProvider";
import { LoadingOverlay } from "./LoadingOverlay";

/**
 * Renders blocking loader overlay.
 *
 * @group ui
 *
 * @example
 * ```tsx
 * import {BlockOverlay} from "@use-pico/client";
 *
 * export const MyComponent = () => {
 *      // Fill the container with blocking loading overlay.
 *      return <BlockOverlay/>;
 * }
 * ```
 */
export namespace BlockOverlay {
	export interface Props {
		delay?: number;
	}
}

export const BlockOverlay: FC<BlockOverlay.Props> = ({ delay = 250 }) => {
	return (
		<BlockProvider isBlock>
			<LoadingOverlay delay={delay} />
		</BlockProvider>
	);
};
