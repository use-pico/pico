import {lazyOf}                    from "@use-pico/container";
import {TranslationSchema}         from "@use-pico/i18n";
import {type ITranslationService}  from "../api/ITranslationService";
import {withTranslationRepository} from "../container/withTranslationRepository";
import {TranslationRepository}     from "../repository/TranslationRepository";

export class TranslationService implements ITranslationService {
    static inject = [
        lazyOf(withTranslationRepository.inject),
    ];

    constructor(
        protected translationRepository: TranslationRepository.Type,
    ) {
    }

    public async translations(locale: string): Promise<Record<string, TranslationSchema.Type>> {
        return (await this.translationRepository.withQuery.query({
            where: {
                locale,
            },
        })).reduce((prev, current) => {
            prev[current.hash] = {
                value: current.value,
            };
            return prev;
        }, {} as Record<string, TranslationSchema.Type>);
    }
}
