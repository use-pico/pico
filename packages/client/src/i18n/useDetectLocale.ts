import { type localeOf } from "@use-pico/common";
import { useEffect } from "react";
import { useLocaleOf } from "./useLocaleOf";

/**
 * Calls callback with detected locale.
 *
 * @group hooks
 */
export namespace useDetectLocale {
	/**
	 * Props for `useDetectLocale`.
	 */
	export interface Props {
		/**
		 * Locale settings.
		 */
		locale: localeOf.Props;

		/**
		 * Callback to call with detected locale.
		 */
		callback(props: localeOf.Props & {
			locale: string
		}): void;
	}
}

export const useDetectLocale = (
	{
		locale,
		callback,
	}: useDetectLocale.Props
) => {
	const $locale = useLocaleOf(locale);
	useEffect(() => {
		callback({
			...locale,
			locale: $locale,
		});
	}, [$locale]);
};
