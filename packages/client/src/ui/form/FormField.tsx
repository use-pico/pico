import type { FC, ReactNode, Ref } from "react";
import { useId } from "react";
import { Container } from "../container/Container";
import { Typo } from "../typo/Typo";
import { FormError } from "./FormError";
import { uiInput } from "./uiInput";

export namespace FormField {
	export type FieldError = any;

	export namespace Render {
		export interface Props extends uiInput.Component<{}> {
			ref?: Ref<any>;
			disabled: boolean;
			id: string;
			meta?: FormError.Meta;
			name?: string;
			required: boolean;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export interface Props extends Omit<Container.Props, "children"> {
		ref?: Ref<any>;
		id?: string;
		label?: ReactNode;
		hint?: ReactNode;
		name?: string;
		required?: boolean;
		disabled?: boolean;
		meta?: FormError.Meta;
		children?: Render.RenderFn;
	}
}

export const FormField: FC<FormField.Props> = (props) => {
	const {
		ref,
		id,
		label,
		hint,
		name,
		required = false,
		disabled = false,
		meta,
		ui,
		children = ({ ui, className, ...props }) => (
			<input
				{...uiInput({
					ui,
					className,
				})}
				{...props}
			/>
		),
		...rest
	} = props;

	const localId = useId();

	const isError = meta?.isTouched && meta.errors && meta.errors.length > 0;

	const tone = isError ? "danger" : required ? "brand" : "neutral";
	const theme = "light";

	return (
		<Container
			data-ui="FormField[Container]"
			ui={{
				tone,
				theme,
				layout: "vertical-flex",
				items: "start",
				justify: "center",
				gap: "xs",
				width: "full",
				...ui,
			}}
			{...rest}
		>
			{label || hint ? (
				<Container
					data-ui="FormField-[Container.header]"
					ui={{
						layout: "vertical-flex",
						gap: "xs",
					}}
				>
					{label ? (
						<Typo
							label={label}
							ui={{
								text: "md",
								font: "normal",
								color: "lead",
							}}
						/>
					) : null}

					{hint ? (
						<Typo
							label={hint}
							ui={{
								tone: "subtle",
								text: "md",
								color: "lead",
								italic: true,
							}}
						/>
					) : null}
				</Container>
			) : null}

			{children({
				disabled,
				id: id ?? localId,
				meta,
				name,
				ref,
				required,
				ui: {
					tone,
					theme,
					width: "full",
				},
				className: [],
			})}

			<FormError meta={meta} />
		</Container>
	);
};
