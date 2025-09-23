import { useCls } from "@use-pico/cls";
import type { FC, ReactNode, Ref } from "react";
import { useId } from "react";
import { Typo } from "../typo/Typo";
import { FormError } from "./FormError";
import { FormFieldCls } from "./FormFieldCls";

export namespace FormField {
	export type FieldError = any;

	export namespace Render {
		export interface Props {
			ref?: Ref<any>;
			className: string;
			disabled: boolean;
			id: string;
			meta?: FormError.Meta;
			name?: string;
			required: boolean;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export interface Props extends FormFieldCls.Props {
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
		cls = FormFieldCls,
		tweak,
		children = (props) => <input {...props} />,
	} = props;

	const localId = useId();

	const isError = meta?.isTouched && meta.errors && meta.errors.length > 0;

	const { slots } = useCls(cls, [
		tweak,
		{
			variant: {
				isSubmitting: false,
				isLoading: false,
				isError,
				required,
				disabled,
			},
		},
	]);

	return (
		<div
			data-ui="FormField-root"
			className={slots.root()}
		>
			{label || meta?.errors?.length || hint ? (
				<div
					data-ui="FormField-header"
					className={slots.header()}
				>
					{label || meta?.errors?.length ? (
						<div
							className={
								"flex flex-row items-end justify-between"
							}
						>
							{label ? (
								<Typo
									size={"md"}
									font={"semi"}
									label={label}
								/>
							) : (
								<div />
							)}
							{meta?.errors?.length ? (
								<FormError meta={meta} />
							) : null}
						</div>
					) : null}
					{hint ? (
						<Typo
							italic
							size={"sm"}
							tone={"subtle"}
							label={hint}
						/>
					) : null}
				</div>
			) : null}
			{children({
				className: slots.input(),
				disabled,
				id: id ?? localId,
				meta,
				name,
				ref,
				required,
			})}
		</div>
	);
};

FormField.displayName = "FormField";
