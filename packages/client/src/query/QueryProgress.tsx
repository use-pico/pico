import { cssOf } from "@use-pico/common";
import { type FC } from "react";
import type { IQueryStore } from "./IQueryStore";
import type { IWithSourceQuery } from "./IWithSourceQuery";
import { useSourceQuery } from "./useSourceQuery";

/**
 * Displays a progress bar when fetching data.
 */
export namespace QueryProgress {
	export interface Props {
		withQueryStore: IQueryStore.Store<any>;
		withSourceQuery: IWithSourceQuery<any, any>;
		refresh?: number;
	}
}

export const QueryProgress: FC<QueryProgress.Props> = ({
	withQueryStore,
	withSourceQuery,
	refresh,
}) => {
	const result = useSourceQuery({
		store: withQueryStore,
		withSourceQuery,
		refetchInterval: refresh,
	});

	return (
		<div className={cssOf("w-full")}>
			<div
				className={cssOf(
					"h-0.5 overflow-hidden bg-sky-500 w-full transition-opacity opacity-0",
					result.isFetching && !result.isLoading && "opacity-100",
				)}
			>
				<div className={cssOf("animate-pulse bg-sky-200")}>
					<div
						className={cssOf(
							"h-full w-full translate-x-full transform bg-sky-600",
						)}
					></div>
				</div>
			</div>
		</div>
	);
};
