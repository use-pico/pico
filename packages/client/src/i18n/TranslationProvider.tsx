import type {
	TranslationsSchema,
	WithLocaleSchema
} from "@use-pico/common";
import {
	type FC,
	type PropsWithChildren
} from "react";
import type { IWithQuery } from "../query/IWithQuery";
import { QueryResult } from "../query/QueryResult";
import { useQueryEx } from "../query/useQueryEx";
import { withTranslations } from "./withTranslations";

export namespace TranslationProvider {
	export type WithQuery = IWithQuery<WithLocaleSchema, TranslationsSchema>;

	export type Props = PropsWithChildren<{
		locale: string;
		withTranslationQuery: WithQuery;
		loader?: QueryResult.Props<TranslationsSchema>["loader"];
	}>
}

export const TranslationProvider: FC<TranslationProvider.Props> = (
	{
		locale,
		withTranslationQuery,
		children
	}
) => {
	const result = useQueryEx({
		withQuery: withTranslationQuery,
		request:   {
			locale,
		},
		options:   {
			retry: 1,
		},
	});

	return <QueryResult<TranslationsSchema>
		result={result}
		success={({entity}) => {
			withTranslations(entity);
			return children;
		}}
		error={() => children}
	/>;
};
