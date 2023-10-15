"use client";

import {isString}              from "@use-pico/utils";
import {useTranslations}       from "next-intl";
import {WithTranslationStore}  from "../store/WithTranslationStore";
import {isTranslation}         from "../utils/isTranslation";
import {type IWithTranslation} from "../utils/IWithTranslation";

export type IUseTranslation = (label?: string, values?: Record<string, any>) => string;

export const useTranslation = (input?: string | IWithTranslation): IUseTranslation => {
    const withTranslation = WithTranslationStore.use$()?.withTranslation(isTranslation(input) ? input : undefined) || input;
    return useTranslations(
        isString(withTranslation) ?
            withTranslation :
            isTranslation(withTranslation) ?
                [
                    withTranslation.namespace,
                    withTranslation.label,
                ].filter(Boolean).join(".") :
                undefined
    );
};
