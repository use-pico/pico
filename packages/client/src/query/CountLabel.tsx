import {
	toHumanNumber,
	type CountSchema,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
} from "@use-pico/common";
import type { ReactNode } from "react";
import type { z } from "zod";
import { Badge } from "../ui/Badge";
import { Loader } from "../ui/Loader";
import type { IQueryStore } from "./IQueryStore";
import type { IWithSourceQuery } from "./IWithSourceQuery";
import { QueryResult } from "./QueryResult";
import { useCount } from "./useCount";

export namespace CountLabel {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> {
		withSourceQuery: IWithSourceQuery<TQuerySchema, any>;
		store: IQueryStore.Store<TQuerySchema>;
		label: ReactNode;
		query: z.infer<TQuerySchema>;
	}
}

export const CountLabel = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>({
	withSourceQuery,
	store,
	label,
	query,
}: CountLabel.Props<TQuerySchema>) => {
	const Result = () => {
		const result = useCount({
			withSourceQuery,
			store,
		});

		return (
			<QueryResult<CountSchema>
				result={result}
				loader={() => (
					<div className={"flex flex-row items-center gap-2"}>
						{label}
						<Badge css={["px-4"]}>
							<Loader />
						</Badge>
					</div>
				)}
				success={({ entity }) => (
					<div className={"flex flex-row items-center gap-2"}>
						{label}
						<Badge css={["px-2"]}>
							{toHumanNumber({ number: entity.count })}
						</Badge>
					</div>
				)}
			/>
		);
	};

	return (
		<store.Provider values={query}>
			<Result />
		</store.Provider>
	);
};
