import { type FC } from "react";
import { Select } from "../form/input/Select";
import { td } from "../i18n/td";
import { useLocale } from "../i18n/useLocale";
import { usePath } from "../router/usePath";
import { useWithRedirect } from "../router/useWithRedirect";

export namespace LanguageSelect {
	export interface Props extends Select.PropsEx<any> {
		languages: string[];
	}
}

export const LanguageSelect: FC<LanguageSelect.Props> = ({
	languages,
	...props
}) => {
	const currentLocale = useLocale();
	const redirect = useWithRedirect();
	const path = usePath();

	return (
		<Select<any>
			icon={'icon-[ion--language-outline]'}
			items={languages.map((language) => ({
				id: language,
				value: language,
			}))}
			value={currentLocale}
			render={({ entity }) => td()(`Language code [${entity.value}]`)}
			onItem={({ id }) =>
				path && redirect(path.replace(`/${currentLocale}/`, `/${id}/`))
			}
			css={{
				root: ["px-4 py-1 border-none"],
				item: ["px-4 py-1"],
			}}
			{...props}
		/>
	);
};
