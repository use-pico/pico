import { translator } from "@use-pico/common/translator";
import type { ComponentProps, FC } from "react";
import { uiInput } from "../form/uiInput";

export namespace TextInput {
	export interface Props extends uiInput.Component<ComponentProps<"input">> {
		//
	}
}

export const TextInput: FC<TextInput.Props> = ({
	placeholder,
	ui,
	className,
	...props
}) => {
	return (
		<input
			type={"text"}
			placeholder={placeholder ? translator.text(placeholder) : undefined}
			{...uiInput({
				ui,
				className,
			})}
			{...props}
		/>
	);
};
