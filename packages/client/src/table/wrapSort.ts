import { pathOf } from "@use-pico/common";
import type { SortType } from "./type/SortType";

export namespace wrapSort {
	export interface Props {
		props?: SortType.Table;
	}
}

export const wrapSort = ({
	props,
}: wrapSort.Props): SortType.Sort | undefined => {
	if (!props) {
		return undefined;
	}

	const $sort = { ...(props.state.value || {}) };
	const $sortPath = pathOf($sort);

	return {
		...props,
		order({ column: { path } }) {
			return $sortPath.get(path);
		},
		toggle({ column: { path, exclusive = false } }) {
			const current = $sortPath.get(path);

			if (exclusive) {
				Object.keys($sort).forEach((key) => {
					delete $sort[key];
				});
			}

			$sortPath.set(
				path,
				current === "asc" ? "desc"
				: current === "desc" ? undefined
				: current === undefined ? "asc"
				: undefined,
			);

			props.state.set({ ...$sort });
		},
	};
};
