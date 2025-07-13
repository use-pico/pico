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
	variant,
	tva = BoolInputCls,
	cls,
	...props
}) => {
	const { el } = tva(variant, cls);

	return (
		<el.base.Div>
			<label>
				<input
					type={"checkbox"}
					checked={Boolean(value)}
					className={"sr-only peer"}
					onChange={(e) => {
						onChange(e.target.checked);
					}}
					{...props}
				/>
				<el.switch.Div />
			</label>
		</el.base.Div>
	);
};
