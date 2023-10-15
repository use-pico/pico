import {
    type FC,
    type PropsWithChildren
}                              from "react";
import {WithTranslationStore}  from "../store/WithTranslationStore";
import {type IWithTranslation} from "../utils/IWithTranslation";

export namespace WithTranslationProvider {
    export type Props = PropsWithChildren<{
        withTranslation?: IWithTranslation;
    }>;
}

export const WithTranslationProvider: FC<WithTranslationProvider.Props> = (
    {
        withTranslation,
        children
    }) => {
    return withTranslation ? <WithTranslationStore.Provider
        defaults={withTranslation}
    >
        {children}
    </WithTranslationStore.Provider> : children;
};
