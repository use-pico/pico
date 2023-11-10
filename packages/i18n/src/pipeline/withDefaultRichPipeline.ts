import {ComponentPipeline}       from "./ComponentPipeline";
import {RichInterpolatePipeline} from "./RichInterpolatePipeline";
import {withRichComponents}      from "./withRichComponents";

export namespace withDefaultRichPipeline {
    export interface Props {
        component?: ComponentPipeline.Config;
    }
}

export const withDefaultRichPipeline = (
    {
        component,
    }: withDefaultRichPipeline.Props,
) => [
    RichInterpolatePipeline(),
    ComponentPipeline(component || {
        components: withRichComponents(),
    }),
];
