import {withComponentPipeline}       from "./withComponentPipeline";
import {withRichComponents}          from "./withRichComponents";
import {withRichInterpolatePipeline} from "./WithRichInterpolatePipeline";

export namespace withDefaultRichPipeline {
	export interface Props {
        component?: withComponentPipeline.Config;
	}
}

export const withDefaultRichPipeline = (
	{
		component,
	}: withDefaultRichPipeline.Props,
) => [
    withRichInterpolatePipeline(),
    withComponentPipeline(component || {
		components: withRichComponents(),
	}),
];
