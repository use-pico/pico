import { isString } from "@use-pico/common/is-string";
import type { FC, ReactNode } from "react";
import { Tx } from "../tx/Tx";
import { Container } from "./Container";

/**
 * Badge component with label and value display.
 *
 * @group ui
 */
export namespace LabelValue {
	export interface Props extends Container.Props {
		/**
		 * Translation label for the badge label text.
		 */
		textLabel?: string;
		textLabelProps?: Tx.PropsEx;
		/**
		 * Value text to display in the badge.
		 */
		textValue: ReactNode | null;
		textValueProps?: Tx.PropsEx;
		textEmpty?: string;
		textHint?: string;
		action?: ReactNode;
		wrapperProps?: Container.Props;
	}

	export type PropsEx = Omit<Props, "textValue">;
}

export const LabelValue: FC<LabelValue.Props> = ({
	textLabel,
	textLabelProps,
	textValue,
	textValueProps,
	textEmpty,
	textHint,
	action,
	wrapperProps: { ui: wrapperUi, ...wrapperPropsRest } = {},
	//
	ui,
	...props
}) => {
	return (
		<Container
			data-ui={"LabelValue[Container]"}
			ui={{
				tone: "neutral",
				theme: "light",
				inner: "default",
				round: "default",
				background: "default",
				flow: "vertical",
				gap: "xs",
				border: true,
				shadow: true,
				width: "full",
				...ui,
			}}
			{...props}
		>
			<Container
				data-ui={"LabelValue-[Container.label-wrapper]"}
				ui={{
					tone: "primary",
					theme: "light",
					flow: "horizontal",
					items: "center",
					justify: "space-between",
					gap: "default",
					color: "lead",
					width: "full",
					...wrapperUi,
				}}
				{...wrapperPropsRest}
			>
				<Tx
					label={textLabel}
					preset={"label"}
					ui={{
						font: "normal",
						color: "lead",
					}}
					{...textLabelProps}
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

			{isString(textValue) ? (
				<Tx
					label={textValue}
					ui={{
						tone: "secondary",
						theme: "light",
						text: "default",
						truncate: true,
					}}
					{...textValueProps}
				/>
			) : (
				textValue
			)}

			{textValue === null ? (
				<Tx
					label={textEmpty}
					ui={{
						tone: "neutral",
						theme: "light",
						opacity: "medium",
					}}
				/>
			) : null}
		</Container>
	);
};
