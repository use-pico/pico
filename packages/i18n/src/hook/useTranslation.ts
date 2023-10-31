import {isString}              from "@use-pico/utils";
import {useIntl}               from "react-intl";
import {WithTranslationStore}  from "../store/WithTranslationStore";
import {isTranslation}         from "../utils/isTranslation";
import {type IWithTranslation} from "../utils/IWithTranslation";

export type IUseTranslation = (label?: string, values?: Record<string, any>) => string;

export const useTranslation = (input?: string | IWithTranslation): IUseTranslation => {
    const intl = useIntl();

    const withTranslation = WithTranslationStore.use$()?.withTranslation(isTranslation(input) ? input : undefined) || input;
    return (label, values) => label ? intl.formatMessage(
        {
            id: isString(withTranslation) ? withTranslation :
                    [
                        withTranslation?.namespace,
                        withTranslation?.label,
                        label,
                    ].filter(Boolean).join("."),
        },
        values
    ) : "";
};
