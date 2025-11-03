import { translator } from "@use-pico/common/translator";
import type { FC, InputHTMLAttributes } from "react";

export namespace TextInput {
	export interface Props extends InputHTMLAttributes<HTMLInputElement> {
		//
	}
}

export const TextInput: FC<TextInput.Props> = ({ placeholder, ...props }) => {
	return (
		<input
			type={"text"}
			placeholder={placeholder ? translator.text(placeholder) : undefined}
			{...props}
		/>
	);
};
