"use client";

import {cn} from "@use-pico/common";
import {type FC} from "react";
import type {IQueryStore} from "../query/IQueryStore";
import type {IWithSourceQuery} from "../query/IWithSourceQuery";
import {useSourceQuery} from "../query/useSourceQuery";
import {Loader as CoolLoader} from "../ui/Loader";

export namespace Loader {
	export interface Props {
		withQueryStore: IQueryStore.Store<any>;
		withSourceQuery: IWithSourceQuery<any, any>;
	}
}

export const Loader: FC<Loader.Props> = (
	{
		withQueryStore,
		withSourceQuery,
	}
) => {
	const result = useSourceQuery({
		store: withQueryStore,
		withSourceQuery,
	});

	return result.isLoading && <div
		className={cn(
			"flex items-center justify-center w-full",
		)}
	>
		<CoolLoader
			size={"5xl"}
		/>
	</div>;
};
