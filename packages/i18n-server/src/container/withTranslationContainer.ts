import {type IContainer}           from "@use-pico/container";
import {
    TranslationRpc,
    withTranslationQuery
}                                  from "@use-pico/i18n";
import {
    withHandler,
    withRepositoryHandler
}                                  from "@use-pico/rpc-server";
import {TranslationRepository}     from "../repository/TranslationRepository";
import {TranslationService}        from "../service/TranslationService";
import {withTranslationRepository} from "./withTranslationRepository";
import {withTranslationService}    from "./withTranslationService";

export const withTranslationContainer: IContainer.Register = container => {
    withTranslationService.bind(container, TranslationService);

    withRepositoryHandler({
        container,
        repository:     TranslationRepository,
        withRepository: withTranslationRepository,
        handler:        TranslationRpc,
    });

    withHandler({
        container,
        key:    withTranslationQuery.key,
        schema: withTranslationQuery.schema,
        async handle(
            {
                container,
                request
            }) {
            return {
                translations: await withTranslationService.use(container).translations(request.locale),
            };
        }
    });
};
