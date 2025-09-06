import { useCls } from "@use-pico/cls";
import type { FC, InputHTMLAttributes, ReactNode } from "react";
import { Badge } from "../badge/Badge";
import { BoolInputCls } from "./BoolInputCls";

export namespace BoolInput {
	export interface Props
		extends BoolInputCls.Props<
			Omit<
				InputHTMLAttributes<HTMLInputElement>,
				"value" | "onChange" | "type"
			>
		> {
		value: boolean | undefined | null;
		onChange(value: boolean): void;
		label?: ReactNode;
		description?: ReactNode;
		textOn?: ReactNode;
		textOff?: ReactNode;
	}
}

export const BoolInput: FC<BoolInput.Props> = ({
	value,
	onChange,
	label,
	description,
	textOn,
	textOff,
	tva = BoolInputCls,
	tweak,
	...props
}) => {
	const slots = useCls(tva, tweak, ({ what }) => ({
		variant: what.variant({
			disabled: props.disabled,
			value: value ?? false,
		}),
	}));

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onChange(!(value ?? false));
		}
	};

	const switchElement = (
		<div
			className={slots.root()}
			role="switch"
			aria-checked={value ?? false}
			aria-disabled={props.disabled}
			tabIndex={props.disabled ? -1 : 0}
			onKeyDown={handleKeyDown}
			onClick={() => {
				if (!props.disabled) {
					onChange(!(value ?? false));
				}
			}}
		>
			<input
				type="checkbox"
				className={slots.input()}
				checked={value ?? false}
				onChange={(event) => {
					onChange(event.target.checked);
				}}
				disabled={props.disabled}
				{...props}
			/>
			<div className={slots.track()}>
				<div className={slots.thumb()} />
			</div>
		</div>
	);

	// If no label, return just the switch
	if (!label) {
		return switchElement;
	}

	// Return switch with label and description
	return (
		<div className={slots.container()}>
			<div className={slots.content()}>
				{switchElement}
				<div className={slots.textContainer()}>
					<label className={slots.label()}>{label}</label>
					{description && (
						<span className={slots.description()}>
							{description}
						</span>
					)}
				</div>
			</div>
			{(textOn || textOff) && (
				<Badge
					tweak={({ what }) => ({
						variant: what.variant({
							tone: value ? "secondary" : "neutral",
							theme: "light",
						}),
					})}
				>
					{value ? textOn : textOff}
				</Badge>
			)}
		</div>
	);
};
