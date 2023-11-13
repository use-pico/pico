import {type ReactNode} from "react";

export const withRichComponents = <TExtra extends Record<string, ReactNode>>(extra?: TExtra) => ({
    b:    <b/>,
    p:    <p/>,
    i:    <i/>,
    mark: <strong/>,
    ...extra,
}) as const;
