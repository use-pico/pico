import type { FC, InputHTMLAttributes } from "react";

export namespace TextInput {
	export interface Props extends InputHTMLAttributes<HTMLInputElement> {
		//
	}
}

export const TextInput: FC<TextInput.Props> = (props) => {
	return (
		<input
			type={"text"}
			{...props}
		/>
	);
};
