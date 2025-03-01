import { pathOf } from "@use-pico/common";
import type { FilterType } from "../type/FilterType";
import { RangeFilter } from "./RangeFilter";

export namespace withRangeFilter {
	export interface Props {
		/**
		 * Path in data property to filter on.
		 */
		path: string;
		lte: string;
		gte: string;
	}
}

export const withRangeFilter = ({
	path,
	lte,
	gte,
}: withRangeFilter.Props): FilterType.Def<any> => {
	return {
		clear({ filter }) {
			filter.shallow(lte, undefined);
			filter.shallow(gte, undefined);
		},
		is({ value }) {
			return (
				pathOf(value).get(lte) !== undefined ||
				pathOf(value).get(gte) !== undefined
			);
		},
		component({ data, filter }) {
			return (
				<RangeFilter
					lte={lte}
					gte={gte}
					filter={filter}
					value={pathOf(data).get(path)}
				/>
			);
		},
	};
};
