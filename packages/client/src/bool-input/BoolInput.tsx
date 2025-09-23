import { useCls } from "@use-pico/cls";
import type { FC, InputHTMLAttributes, ReactNode, Ref } from "react";
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
		ref?: Ref<HTMLInputElement>;
		value: boolean | undefined | null;
		onChange(value: boolean): void;
		label?: ReactNode;
		description?: ReactNode;
		textOn?: ReactNode;
		textOff?: ReactNode;
	}
}

export const BoolInput: FC<BoolInput.Props> = ({
	ref,
	value,
	onChange,
	label,
	description,
	textOn,
	textOff,
	cls = BoolInputCls,
	tweak,
	...props
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			disabled: props.disabled,
			value: value ?? false,
		},
	});

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onChange(!(value ?? false));
		}
	};

	const switchElement = (
		<div
			data-ui="BoolInput-root"
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
				ref={ref}
				type="checkbox"
				data-ui="BoolInput-input"
				className={slots.input()}
				checked={value ?? false}
				onChange={(event) => {
					onChange(event.target.checked);
				}}
				disabled={props.disabled}
				{...props}
			/>
			<div
				data-ui="BoolInput-track"
				className={slots.track()}
			>
				<div
					data-ui="BoolInput-thumb"
					className={slots.thumb()}
				/>
			</div>
		</div>
	);

	// If no label, return just the switch
	if (!label) {
		return switchElement;
	}

	// Return switch with label and description
	return (
		<div
			data-ui="BoolInput-container"
			className={slots.container()}
		>
			<div
				data-ui="BoolInput-content"
				className={slots.content()}
			>
				{switchElement}
				<div
					data-ui="BoolInput-textContainer"
					className={slots.textContainer()}
				>
					<label
						data-ui="BoolInput-label"
						className={slots.label()}
					>
						{label}
					</label>
					{description && (
						<span
							data-ui="BoolInput-description"
							className={slots.description()}
						>
							{description}
						</span>
					)}
				</div>
			</div>
			{(textOn || textOff) && (
				<Badge
					tweak={{
						variant: {
							tone: value ? "secondary" : "neutral",
							theme: "light",
						},
					}}
				>
					{value ? textOn : textOff}
				</Badge>
			)}
		</div>
	);
};
