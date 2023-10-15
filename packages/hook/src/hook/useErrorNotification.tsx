"use client";

import {WithTranslationStore} from "@pico/i18n";
import {
    AlertIcon,
    withNotification
}                             from "@pico/ui";

export namespace useErrorNotification {
    export interface Props extends Omit<withNotification.Props, "title" | "message"> {
    }
}

export const useErrorNotification = () => {
    const translation = WithTranslationStore.use$();
    return (
        {
            withTranslation,
            ...props
        }: useErrorNotification.Props = {}
    ) => {
        const $withTranslation = {
            ...withTranslation,
            label: [withTranslation?.label, "error"].filter(Boolean).join("."),
        };
        withNotification({
            withTranslation: translation?.withTranslation($withTranslation) || $withTranslation,
            icon:            <AlertIcon color={"black"} size={"1.1rem"}/>,
            color:           "red",
            ...props,
        });
    };
};
