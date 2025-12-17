import type { EntitySchema } from "@use-pico/common/schema";
import type { ReactNode } from "react";
import { Tx } from "../tx/Tx";
import { Container } from "./Container";
import { SpinnerContainer } from "./SpinnerContainer";

export namespace ValueList {
	export interface Props<TItem extends EntitySchema.Type>
		extends Container.Props {
		/**
		 * Translation label for the list title.
		 */
		textLabel: string;
		/**
		 * Translation label for the empty state.
		 */
		textEmpty: string;
		/**
		 * Translation label for the hint text.
		 */
		textHint?: string;
		/**
		 * Array of items to display.
		 */
		items: TItem[];
		/**
		 * Function to render each item.
		 */
		renderFn(item: TItem): ReactNode;
		/**
		 * Action element to display next to the title.
		 */
		action?: ReactNode;
		loading?: boolean;
	}

	export type PropsEx<TItem extends EntitySchema.Type> = Omit<
		Props<TItem>,
		"textLabel" | "textEmpty"
	>;
}

export const ValueList = <TItem extends EntitySchema.Type>({
	textLabel,
	textEmpty,
	textHint,
	items,
	renderFn,
	action,
	loading,
	ui,
	...props
}: ValueList.Props<TItem>) => {
	return (
		<Container
			data-root="ValueList[Container]"
			ui={{
				tone: "neutral",
				theme: "light",
				inner: "default",
				round: "default",
				background: "default",
				border: true,
				shadow: true,
				flow: "vertical",
				gap: "xs",
				...ui,
			}}
			{...props}
		>
			<Container
				data-ui={"ValueList-[Container.label-wrapper]"}
				ui={{
					tone: "primary",
					theme: "light",
					flow: "horizontal",
					items: "center",
					justify: "space-between",
					gap: "default",
					color: "lead",
				}}
			>
				<Tx
					label={textLabel}
					preset={"label"}
					ui={{
						font: "normal",
						display: "block",
						color: "lead",
					}}
				/>

				{action}
			</Container>

			{textHint ? (
				<Tx
					label={textHint}
					ui={{
						tone: "neutral",
						theme: "light",
						text: "xs",
						color: "icon",
						italic: true,
					}}
				/>
			) : null}

			<Container
				data-ui="ValueList-[Container.content]"
				ui={{
					tone: undefined,
					theme: undefined,
					layout: "vertical-flex",
					gap: "xs",
					height: "auto",
				}}
			>
				{loading
					? null
					: items.map((item) => (
							<Container
								key={item.id}
								data-ui="ValueList-[Container.item]"
								ui={{
									tone: "subtle",
									theme: "light",
									background: "default",
									border: true,
									round: "default",
									inner: "default",
								}}
							>
								{renderFn(item)}
							</Container>
						))}

				{loading && (
					<SpinnerContainer
						size={"md"}
						ui={{
							height: "content",
						}}
					/>
				)}

				{!loading && items.length === 0 && (
					<Tx
						label={textEmpty}
						ui={{
							tone: "neutral",
							theme: "light",
							opacity: "medium",
						}}
					/>
				)}
			</Container>
		</Container>
	);
};
