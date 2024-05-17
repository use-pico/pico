import {type ReactNode} from "react";

export namespace ITranslationPipeline {
    export type Text = (props: ITranslationPipeline.Props<string>) => string;
    export type Rich = (props: ITranslationPipeline.Props<ReactNode>) => ReactNode;
    export type Pipeline =
        | Text
        | Rich;

    export type Factory<TPipeline extends Pipeline> = () => TPipeline;

    export type ConfigFactory<TConfig, TPipeline extends Pipeline> = (config: TConfig) => TPipeline;

    export interface Props<TText extends ReactNode | string> {
        text: TText;
        values?: Record<string, any>;
    }
}
