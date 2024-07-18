import type { SpotlightQuerySchema, SpotlightSchema } from "@use-pico/common";
import type { IWithSourceQuery } from "../query/IWithSourceQuery";
import { Results } from "./Results";
import { Search } from "./Search";
import { SpotlightQueryStore } from "./SpotlightQueryStore";

export namespace Spotlight {
	export interface Props<TTypes extends string = string> {
		withSourceQuery: IWithSourceQuery<SpotlightQuerySchema, SpotlightSchema>;
		hotkeys?: string[];
		handlers: Results.Handlers<TTypes>;
		text?: {
			placeholder?: string;
		};
	}
}

export const Spotlight = <TTypes extends string = string>({
	withSourceQuery,
	hotkeys = ["mod+h", "/"],
	handlers,
	text,
}: Spotlight.Props<TTypes>) => {
	return (
		<SpotlightQueryStore.Provider
			values={{
				cursor: {
					page: 0,
					size: 10,
				},
			}}
		>
			<Search
				withSourceQuery={withSourceQuery}
				hotkeys={hotkeys}
				handlers={handlers}
				text={text}
			/>
		</SpotlightQueryStore.Provider>
	);
};
