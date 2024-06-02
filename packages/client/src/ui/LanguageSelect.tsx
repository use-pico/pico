"use client";

import {usePathname}     from "next/navigation";
import {type FC}         from "react";
import {Select}          from "../form/input/Select";
import {td}              from "../i18n/td";
import {useLocale}       from "../i18n/useLocale";
import {useWithRedirect} from "../router/useWithRedirect";

export namespace LanguageSelect {
	export interface Props extends Select.PropsEx<any> {
		languages: string[];
	}
}

export const LanguageSelect: FC<LanguageSelect.Props> = (
	{
		languages,
		...props
	}) => {
	const currentLocale = useLocale();
	const redirect = useWithRedirect();
	const pathname = usePathname();

	return <Select<any>
		items={languages.map(language => ({
            id: language,
			value: language,
		}))}
		defaultValue={{
			id:    currentLocale,
			value: currentLocale,
		}}
		render={({entity}) => td()(`Language code [${entity.value}]`)}
		onItem={({id}) => pathname && redirect(pathname.replace(`/${currentLocale}/`, `/${id}/`))}
		{...props}
	/>;
};
