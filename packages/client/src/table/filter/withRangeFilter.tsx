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
}: withRangeFilter.Props): FilterType.Column<any> => {
	return {
		reset({ filter: filterInstance }) {
			filterInstance.shallow({
				path: lte,
				value: undefined,
			});
			filterInstance.shallow({
				path: gte,
				value: undefined,
			});
		},
		is({ filter: filterInstance }) {
			return (
				pathOf(filterInstance.state.value || {}).get(lte) !==
					undefined ||
				pathOf(filterInstance.state.value || {}).get(gte) !== undefined
			);
		},
		component({ data, filter: filterInstance }) {
			return (
				<RangeFilter
					lte={lte}
					gte={gte}
					filterInstance={filterInstance}
					value={pathOf(data).get(path)}
				/>
			);
		},
	};
};
