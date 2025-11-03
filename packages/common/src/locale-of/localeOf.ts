import { preferredLocale } from "preferred-locale";

/**
 * Extract preferred locale from the available locales and fallback locale.
 *
 * @group i18n
 */
export namespace localeOf {
	/**
	 * Props for `localeOf`.
	 */
	export interface Props {
		/**
		 * Available locales in your app.
		 */
		available: string[];
		/**
		 * Fallback locale.
		 */
		fallback: string;
	}
}

export const localeOf = ({ available, fallback }: localeOf.Props) => {
	return preferredLocale(fallback, available, {
		languageOnly: true,
	});
};
