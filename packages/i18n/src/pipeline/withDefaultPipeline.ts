import {withDefaultRichPipeline} from "./withDefaultRichPipeline";
import {withDefaultTextPipeline} from "./withDefaultTextPipeline";

export namespace withDefaultPipeline {
    export interface Props {
        rich: withDefaultRichPipeline.Props;
    }
}

export const withDefaultPipeline = (
    {
        rich,
    }: withDefaultPipeline.Props,
) => {
    return {
        text: withDefaultTextPipeline(),
        rich: withDefaultRichPipeline(rich),
    };
};
