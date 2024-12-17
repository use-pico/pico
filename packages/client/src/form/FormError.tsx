import { translator } from "@use-pico/common";
import type { FC } from "react";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Icon } from "../icon/Icon";
import { FormErrorCss } from "./FormErrorCss";

export namespace FormError {
	export interface Props extends FormErrorCss.Props {
		error?: {
			message?: string;
		};
	}
}

export const FormError: FC<FormError.Props> = ({
	error,
	variant,
	tva = FormErrorCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return error?.message ?
			<div className={tv.base()}>
				<Icon icon={ErrorIcon} />
				<span>{translator.rich(error.message)}</span>
			</div>
		:	null;
};
