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
	const classes = tva.create(cls);

	return (
		<div className={classes.base}>
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
				<div className={classes.switch} />
			</label>
		</div>
	);
};
