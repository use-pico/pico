import { useCls } from "@use-pico/cls";
import type { ComponentProps, FC, ReactNode } from "react";
import { Badge } from "../badge/Badge";
import { BoolInputCls } from "./BoolInputCls";

export namespace BoolInput {
	export interface Props
		extends BoolInputCls.Props<
			Omit<ComponentProps<"input">, "value" | "onChange" | "type">
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
			data-root="BoolInput-switch"
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
			data-root="BoolInput"
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
					data-ui="BoolInput-badge"
					ui={{
						tone: value ? "secondary" : "neutral",
					}}
				>
					{value ? textOn : textOff}
				</Badge>
			)}
		</div>
	);
};
