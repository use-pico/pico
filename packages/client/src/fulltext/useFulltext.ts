import type { StateType } from "@use-pico/common";
import { useMemo, useState } from "react";
import type { Fulltext } from "./Fulltext";

export namespace useFulltext {
	export type State = StateType<Fulltext.Value>;

	export interface Props {
		initial?: Fulltext.Value;
	}
}

export const useFulltext = ({
	initial,
}: useFulltext.Props = {}): useFulltext.State => {
	const [fulltext, setFulltext] = useState<Fulltext.Value>(initial);

	return useMemo(
		() => ({
			value: fulltext,
			set(fulltext) {
				setFulltext(fulltext);
			},
		}),
		[
			fulltext,
		],
	);
};
