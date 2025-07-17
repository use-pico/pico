import { translator } from "@use-pico/common";
import type { FC } from "react";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Icon } from "../icon/Icon";
import { FormErrorCls } from "./FormErrorCls";

export namespace FormError {
	export interface Props extends FormErrorCls.Props {
		errors: string[] | undefined;
	}
}

export const FormError: FC<FormError.Props> = ({
	errors,
	variant,
	tva = FormErrorCls,
	cls,
}) => {
	const { slots } = tva(variant, cls);

	if (!errors || errors.length === 0) {
		return null;
	}

	return (
		<div className={slots.base()}>
			{errors.map((error, index) => (
				<div
					key={`${index}-${error}`}
					className={slots.error()}
				>
					<Icon icon={ErrorIcon} />
					<span>{translator.rich(error)}</span>
				</div>
			))}
		</div>
	);
};
