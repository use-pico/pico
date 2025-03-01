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
}: withEqualFilter.Props): FilterType.Def<any> => {
	return {
		clear({ filter }) {
			filter.shallow(path, undefined);
		},
		is({ value }) {
			return pathOf(value).get(path) !== undefined;
		},
		component({ data, filter }) {
			const isFilter = pathOf(filter.value).get(path) === undefined;

			return isFilter ?
					<EqualFilter
						path={path}
						filter={filter}
						value={pathOf(data).get(from)}
					/>
				:	null;
		},
	};
};
