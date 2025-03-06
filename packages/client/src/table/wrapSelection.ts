import type { DataType } from "./type/DataType";
import type { SelectionType } from "./type/SelectionType";

export namespace wrapSelection {
	export interface Props<TData extends DataType.Data> {
		props?: SelectionType.Table;
		data: TData[];
	}
}

export const wrapSelection = <TData extends DataType.Data>({
	props,
	data,
}: wrapSelection.Props<TData>): SelectionType.Selection | undefined => {
	if (!props) {
		return undefined;
	}

	const selection = new Set<string>(props.state?.value);

	return {
		...props,
		isSelected({ data }) {
			return selection.has(data.id) || false;
		},
		isAll() {
			return data.every((data) => selection.has(data.id));
		},
		isAny() {
			return data.some((data) => selection.has(data.id));
		},
		event: {
			onSelect({ data }) {
				switch (props.type) {
					case "single": {
						const selected = selection.has(data.id);
						selection.clear();
						selected ? selection.delete(data.id) : selection.add(data.id);
						break;
					}
					case "multi": {
						selection.has(data.id) ?
							selection.delete(data.id)
						:	selection.add(data.id);
						break;
					}
				}

				props.state.set(Array.from(selection));
			},
			onSelectAll() {
				if (data.every((data) => selection.has(data.id))) {
					selection.clear();
				} else {
					data.forEach(({ id }) => selection.add(id));
				}

				props.state.set(Array.from(selection));
			},
		},
	};
};
