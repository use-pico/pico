"use client";

import type {
	SpotlightQuerySchema,
	SpotlightSchema
}                              from "@use-pico/common";
import {type FC}               from "react";
import type {IWithSourceQuery} from "../query/IWithSourceQuery";
import {Results}               from "./Results";
import {Search}                from "./Search";
import {SpotlightQueryStore}   from "./SpotlightQueryStore";

export namespace Spotlight {
	export interface Props {
		withSourceQuery: IWithSourceQuery<SpotlightQuerySchema, SpotlightSchema>;
		hotkeys?: string[];
		handlers: Results.Handlers;
		text?: {
			placeholder?: string;
		};
	}
}

export const Spotlight: FC<Spotlight.Props> = (
	{
		withSourceQuery,
		hotkeys = ["mod+h", "/"],
		handlers,
		text,
	}
) => {
	return <SpotlightQueryStore.Provider
		values={{
			cursor: {
				page: 0,
				size: 10,
			},
		}}
	>
		<Search
			withSourceQuery={withSourceQuery}
			hotkeys={hotkeys}
			handlers={handlers}
			text={text}
		/>
	</SpotlightQueryStore.Provider>;
};
