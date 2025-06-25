import { translator } from "@use-pico/common";
import type { FC } from "react";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Icon } from "../icon/Icon";
import { FormErrorCls } from "./FormErrorCls";

export namespace FormError {
	export interface Props extends FormErrorCls.Props {
		error?: {
			message?: string;
		};
	}
}

export const FormError: FC<FormError.Props> = ({
	error,
	variant,
	tva = FormErrorCls,
	cls,
}) => {
	const { slots } = tva(variant, cls);

	return error?.message ? (
		<div className={slots.base()}>
			<Icon icon={ErrorIcon} />
			<span>{translator.rich(error.message)}</span>
		</div>
	) : null;
};
