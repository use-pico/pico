import { pathOf } from "@use-pico/common";
import type { FilterType } from "../type/FilterType";
import { EqualFilter } from "./EqualFilter";

export namespace withEqualFilter {
	export interface Props {
		/**
		 * Filter path
		 */
		path: string;
		/**
		 * Data path to get value from
		 *
		 * If not specific, path is used.
		 */
		from?: string;
	}
}

export const withEqualFilter = ({
	path,
	from = path,
}: withEqualFilter.Props): FilterType.Column<any> => {
	return {
		reset({ filter: filterInstance }) {
			filterInstance.shallow({ path, value: undefined });
		},
		is({ filter: filterInstance }) {
			return pathOf(filterInstance.state.value || {}).get(path) !== undefined;
		},
		component({ data, filter: filterInstance }) {
			const isFilter =
				pathOf(filterInstance.state.value || {}).get(path) === undefined;

			return isFilter ?
					<EqualFilter
						path={path}
						filterInstance={filterInstance}
						value={pathOf(data).get(from)}
					/>
				:	null;
		},
	};
};
