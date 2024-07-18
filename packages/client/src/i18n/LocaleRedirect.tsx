import { linkTo, type localeOf } from "@use-pico/common";
import { type FC } from "react";
import { useNavigate } from "../router/useNavigate";
import { DetectLocale } from "./DetectLocale";

/**
 * When this component is used, it immediately redirects to the target URL with the detected locale.
 *
 * @group i18n
 */
export namespace LocaleRedirect {
	/**
	 * Props for `LocaleRedirect`.
	 */
	export interface Props {
		/**
		 * Target URL.
		 */
		target?: string;
		/**
		 * Locale to redirect to.
		 */
		locale: localeOf.Props;
		/**
		 * Props for `DetectLocale`.
		 */
		detectLocaleProps?: Omit<DetectLocale.Props, "locale" | "callback">;
	}
}

export const LocaleRedirect: FC<LocaleRedirect.Props> = ({
	target,
	locale,
	detectLocaleProps,
}) => {
	const navigate = useNavigate();
	return (
		<DetectLocale
			locale={locale}
			callback={({ locale }) =>
				navigate(linkTo(target ? `/${locale}/${target}` : `/${locale}`))
			}
			{...detectLocaleProps}
		/>
	);
};
