import pupa             from "pupa";
import {type IPipeline} from "../api/IPipeline";

export const InterpolatePipeline: IPipeline.Factory<IPipeline.Text> = () => (
    {
        text,
        values
    }
) => {
    return pupa(text, values || {}, {
        ignoreMissing: true,
    });
};
