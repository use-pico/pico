import {InterpolatePipeline} from "./InterpolatePipeline";

export namespace withDefaultTextPipeline {
}

export const withDefaultTextPipeline = () => [
    InterpolatePipeline(),
];
