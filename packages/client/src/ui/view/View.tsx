import { entriesOf } from "@use-pico/common/entries-of";
import type { StateType } from "@use-pico/common/type";
import { type PropsWithChildren, type ReactNode, useId } from "react";
import { Container } from "../container";

export namespace View {
	export type View<TProps> = PropsWithChildren<
		TProps & {
			scroller?: "vertical" | "horizontal" | false;
		}
	>;

	export type Views<TView extends string, TProps> = Record<
		TView,
		View<TProps>
	>;

	export namespace Children {
		export interface Props {
			content: ReactNode;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export interface Props<TView extends string, TProps> {
		state: StateType.State<TView>;
		views: Views<TView, TProps>;
		children: Children.RenderFn;
	}
}

export const View = <TView extends string, TProps>({
	state,
	views,
	children,
}: View.Props<TView, TProps>) => {
	const viewId = useId();

	return children({
		content: entriesOf(views).map(
			([key, { scroller = "vertical", children }]) => {
				return (
					<Container
						key={`${viewId}-${key}`}
						ui={{
							scroll: scroller === false ? undefined : scroller,
							height: "full",
							width: "full",
						}}
						className={state.value === key ? undefined : "hidden"}
					>
						{children}
					</Container>
				);
			},
		),
	});
};
