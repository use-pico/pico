import type { StateType } from "@use-pico/common";
import { useMemo, useState } from "react";

export namespace useSelection {
	export type State = StateType<string[]>;

	export interface Props {
		initial?: string[];
	}
}

export const useSelection = ({
	initial = [],
}: useSelection.Props = {}): useSelection.State => {
	const [selection, setSelection] = useState<string[]>(initial);

	return useMemo(
		() => ({
			value: selection,
			set(selection) {
				setSelection(selection);
			},
		}),
		[
			selection,
		],
	);
};
