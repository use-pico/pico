import type { StateType } from "@use-pico/common/type";
import { useId } from "react";
import { BottomSheet } from "../bottom-sheet";
import { View } from "../view";

export namespace SheetView {
	export interface Props<TView extends string>
		extends Omit<BottomSheet.Props, "children"> {
		state: StateType.State<TView>;
		views: View.Views<TView, View.View<Partial<BottomSheet.Props>>>;
	}
}

export const SheetView = <TView extends string>({
	state,
	views,
	contentProps,
	...props
}: SheetView.Props<TView>) => {
	const { children: _, ...current } = views[state.value];

	const rest = {
		...props,
		...current,
	};

	const sheetId = useId();

	return (
		<View
			state={state}
			views={views}
		>
			{({ content }) => {
				return (
					<BottomSheet
						key={sheetId}
						{...rest}
						contentProps={{
							...contentProps,
							...current.contentProps,
							disableScroll: true,
						}}
					>
						{content}
					</BottomSheet>
				);
			}}
		</View>
	);
};
