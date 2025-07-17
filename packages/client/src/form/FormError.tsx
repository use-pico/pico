import { type ErrorSchema, translator } from "@use-pico/common";
import type { FC } from "react";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Icon } from "../icon/Icon";
import { FormErrorCls } from "./FormErrorCls";

export namespace FormError {
	export interface Meta {
		isDirty: boolean;
		isTouched: boolean;
		errors: ErrorSchema.Type[] | undefined;
	}

	export interface Props extends FormErrorCls.Props {
		meta: Meta;
	}
}

export const FormError: FC<FormError.Props> = ({
	meta,
	variant,
	tva = FormErrorCls,
	cls,
}) => {
	const { slots } = tva(variant, cls);

	const shouldShowError =
		meta.isDirty && meta.isTouched && meta.errors && meta.errors.length > 0;

	return shouldShowError ? (
		<div className={slots.base()}>
			{meta.errors?.map((error, index) => (
				<div
					key={`${index}-${error}`}
					className={slots.error()}
				>
					<Icon icon={ErrorIcon} />
					<span>{translator.rich(error.message)}</span>
				</div>
			))}
		</div>
	) : null;
};
