import {StoreProvider}         from "@use-pico/store";
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
    return withTranslation ? <StoreProvider
        store={WithTranslationStore}
        values={withTranslation}
    >
        {children}
    </StoreProvider> : children;
};
