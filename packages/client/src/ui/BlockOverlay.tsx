import {type FC}        from "react";
import {BlockProvider}  from "../provider/BlockProvider";
import {LoadingOverlay} from "./LoadingOverlay";

export namespace BlockOverlay {
	export interface Props {
	}
}

/**
 * Renders blocking loader overlay.
 *
 * @category UI
 */
export const BlockOverlay: FC<BlockOverlay.Props> = () => {
	return <BlockProvider
		isBlock
	>
		<LoadingOverlay/>
	</BlockProvider>;
};
