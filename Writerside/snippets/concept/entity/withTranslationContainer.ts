import {type IContainer}           from "@use-pico/container";
import {TranslationRpc}            from "@use-pico/i18n";
import {withRepositoryHandler}     from "@use-pico/rpc-server";
import {TranslationRepository}     from "../repository/TranslationRepository";
import {withTranslationRepository} from "./withTranslationRepository";

export const withTranslationContainer: IContainer.Register = container => {
    withRepositoryHandler({
        container,
        repository:     TranslationRepository,
        /**
         * This tells Pico, where to bind your Repository
         */
        withRepository: withTranslationRepository,
        /**
         * RPC stuff from client side to let Pico know, on which
         * keys it should "listen" for queries/mutations.
         */
        handler:        TranslationRpc,
    });
};
