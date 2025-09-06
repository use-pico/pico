import type { FC } from "react";
import { Button } from "../../button/Button";

export namespace SubmitButton {
	export interface Props extends Button.Props {
		//
	}
}

export const SubmitButton: FC<SubmitButton.Props> = (props) => {
	return (
		<Button
			type={"submit"}
			tweak={({ what }) => ({
				variant: what.variant({
					tone: "primary",
				}),
			})}
			{...props}
		/>
	);
};
