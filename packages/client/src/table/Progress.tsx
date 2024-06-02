"use client";

import {cn}                    from "@use-pico/common";
import {type FC}               from "react";
import type {IQueryStore}      from "../query/IQueryStore";
import type {IWithSourceQuery} from "../query/IWithSourceQuery";
import {useSourceQuery}        from "../query/useSourceQuery";

export namespace Progress {
	export interface Props {
		withQueryStore: IQueryStore.Store<any>;
		withSourceQuery: IWithSourceQuery<any, any>;
		refresh?: number;
	}
}

export const Progress: FC<Progress.Props> = (
	{
		withQueryStore,
		withSourceQuery,
		refresh,
	}
) => {
	const result = useSourceQuery({
        store: withQueryStore,
		withSourceQuery,
		refetchInterval: refresh,
	});

	return <div
		className={cn(
			"relative",
			"w-full",
		)}
	>
		<div
			className={cn(
				"h-0.5 overflow-hidden bg-sky-500 absolute w-full top-0 z-10 transition-opacity opacity-0",
				{"opacity-100": result.isFetching && !result.isLoading}
			)}
		>
			<div
				className={cn(
					"animate-pulse bg-sky-200",
				)}
			>
				<div
					className={cn(
						"h-full w-full translate-x-full transform bg-sky-600",
					)}
				>
				</div>
			</div>
		</div>
	</div>;
};
