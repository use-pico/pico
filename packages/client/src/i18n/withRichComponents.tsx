import {type ReactNode} from "react";

export const withRichComponents = <TExtra extends Record<string, ReactNode>>(extra?: TExtra) => ({
	b:    <b/>,
	p:    <p/>,
	i:    <i/>,
	br:   <br/>,
	mark: <strong/>,
	...extra,
}) as const;
