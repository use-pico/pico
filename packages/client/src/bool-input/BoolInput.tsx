import type { FC, InputHTMLAttributes } from "react";
import { BoolInputCss } from "./BoolInputCss";

export namespace BoolInput {
	export interface Props
		extends BoolInputCss.Props<
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
	tva = BoolInputCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
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
				<div className={tv.switch()}></div>
			</label>
		</div>
	);
};
