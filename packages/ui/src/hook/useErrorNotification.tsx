"use client";

import {WithTranslationStore} from "@use-pico/i18n";
import {useStore$}            from "@use-pico/store";
import {AlertIcon}            from "../icon/AlertIcon";
import {withNotification}     from "../utils/withNotification";

export namespace useErrorNotification {
    export interface Props extends Omit<withNotification.Props, "title" | "message"> {
    }
}

export const useErrorNotification = () => {
    const translation = useStore$(WithTranslationStore);
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
