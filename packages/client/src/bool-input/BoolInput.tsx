import { useCls } from "@use-pico/cls";
import type { FC, InputHTMLAttributes } from "react";
import { BoolInputCls } from "./BoolInputCls";

export namespace BoolInput {
	export interface Props
		extends BoolInputCls.Props<
			Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">
		> {
		value: boolean | undefined | null;
		onChange(value: boolean): void;
	}
}

export const BoolInput: FC<BoolInput.Props> = ({
	value,
	onChange,
	tva = BoolInputCls,
	cls,
	...props
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			disabled: props.disabled,
			value: value ?? false,
		}),
	}));

	return <div className={slots.root()}></div>;
};
