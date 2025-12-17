import { Icon, SpinnerIcon } from "@use-pico/client/icon";
import type { FC } from "react";
import type { uiIcon } from "../../icon/uiIcon";
import { Status } from "../status/Status";
import { Container } from "./Container";

export namespace SpinnerContainer {
	export interface Props extends Container.Props {
		statusProps?: Status.Props;
		iconProps?: Icon.Props;
		size?: uiIcon.Size;
		type?: "icon" | "status";
	}
}

export const SpinnerContainer: FC<SpinnerContainer.Props> = ({
	statusProps,
	iconProps,
	size = "4xl",
	type = "status",
	//
	ui,
	//
	...props
}) => {
	return (
		<Container
			ui={{
				tone: "brand",
				theme: "light",
				layout: "vertical-centered",
				height: "full",
				text: size,
				color: "lead",
				...ui,
			}}
			{...props}
		>
			{type === "status" ? (
				<Status
					icon={SpinnerIcon}
					iconProps={{
						...iconProps,
					}}
					{...statusProps}
				/>
			) : null}

			{type === "icon" ? (
				<Icon
					icon={SpinnerIcon}
					{...iconProps}
				/>
			) : null}
		</Container>
	);
};
