import type { FC } from "react";
import { Button } from "../button/Button";

export namespace SubmitButton {
	export interface Props extends Button.Props {
		//
	}
}

export const SubmitButton: FC<SubmitButton.Props> = ({ ui, ...props }) => {
	return (
		<Button
			type={"submit"}
			ui={{
				tone: "primary",
				theme: "light",
				size: "default",
				text: "lg",
				justify: "center",
				width: "full",
				...ui,
			}}
			iconProps={{
				ui: {
					text: "xl",
				},
			}}
			{...props}
		/>
	);
};
