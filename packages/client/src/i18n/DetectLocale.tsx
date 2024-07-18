import {type FC}         from "react";
import {useDetectLocale} from "./useDetectLocale";

/**
 * Calls callback with detected locale.
 */
export namespace DetectLocale {
	/**
	 * Props for `DetectLocale`.
	 */
	export type Props = useDetectLocale.Props;
}

export const DetectLocale: FC<DetectLocale.Props> = (
	{
		locale,
		callback,
	}) => {
	useDetectLocale({
		locale,
		callback
	});
	return null;
};
