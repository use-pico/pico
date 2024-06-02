"use client";

import type {ITranslations}      from "@use-pico/common";
import axios                     from "axios";
import {
    type FC,
    type PropsWithChildren,
    type ReactNode
}                                from "react";
import {DateTimeProvider}        from "../i18n/DateTimeProvider";
import {TranslationProvider}     from "../i18n/TranslationProvider";
import {withDefaultPipeline}     from "../i18n/withDefaultPipeline";
import {withRichComponents}      from "../i18n/withRichComponents";
import {withTranslationInstance} from "../i18n/withTranslationInstance";
import {withTranslationQuery}    from "../i18n/withTranslationQuery";
import {RpcProvider}             from "../rpc/RpcProvider";
import {LoadingOverlay}          from "../ui/LoadingOverlay";
import {BlockProvider}           from "./BlockProvider";
import {QueryClientProvider}     from "./QueryClientProvider";

export namespace Providers {
	export type Props = PropsWithChildren<{
		/**
		 * Set current locale
		 */
		locale: string;
		translations?: {
			translations: ITranslations;
			components: Record<string, ReactNode>;
			withQuery?: TranslationProvider.WithQuery;
		};
		baseUrl?: string;
	}>;
}

export const Providers: FC<Providers.Props> = (
	{

		locale,
		translations = {},
		baseUrl,
		children,
	}
) => {
	axios.defaults.baseURL = baseUrl;
	withTranslationInstance({
		locale,
		translations: translations?.translations || {},
        pipeline: withDefaultPipeline({
			rich: {
				component: {
					components: translations?.components || withRichComponents(),
				}
			}
		}),
	});

	return <QueryClientProvider>
		<BlockProvider>
			<RpcProvider>
				<TranslationProvider
					locale={locale}
					withTranslationQuery={translations.withQuery || withTranslationQuery}
				>
					<DateTimeProvider
						locale={locale}
					>
						<LoadingOverlay/>
						{children}
					</DateTimeProvider>
				</TranslationProvider>
			</RpcProvider>
		</BlockProvider>
	</QueryClientProvider>;
};
