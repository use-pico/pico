import type { ComponentProps, FC, ReactNode } from "react";
import { Icon } from "../../icon/Icon";
import { Container } from "../container/Container";
import { Mx } from "../mx";
import { Tx } from "../tx/Tx";
import type { Typo } from "../typo/Typo";
import { uiStatus } from "./uiStatus";

export namespace Status {
	export interface Props extends uiStatus.Component<ComponentProps<"div">> {
		/**
		 * Translation key for the title text.
		 */
		textTitle?: string;
		/**
		 * Translation key for the message text.
		 */
		textMessage?: string;
		/**
		 * Optional action section (e.g., buttons)
		 */
		action?: ReactNode;
		icon?: Icon.Type;
		iconProps?: Icon.PropsEx;
		titleProps?: Typo.PropsEx;
		messageProps?: Mx.PropsEx;
	}
}

export const Status: FC<Status.Props> = ({
	textTitle,
	textMessage,
	action,
	icon,
	iconProps,
	titleProps,
	messageProps,
	//
	ui,
	className,
	//
	children,
	...props
}) => {
	return (
		<div
			{...uiStatus({
				ui,
				//
				className,
			})}
			//
			{...props}
		>
			<Container
				data-ui="Status-[Container.wrapper]"
				ui={{
					layout: "vertical-flex",
					items: "center",
					width: "full",
					gap: "lg",
				}}
			>
				<Icon
					data-ui="Status-[Icon]"
					icon={icon}
					{...iconProps}
				/>

				<Container
					data-ui="Status-[Container.title-wrapper]"
					ui={{
						layout: "vertical-flex",
						items: "center",
						width: "full",
					}}
				>
					<Tx
						data-ui="Status-[Tx-title]"
						label={textTitle}
						ui={{
							font: "semibold",
							display: "block",
							wrap: "wrap",
							text: "lg",
						}}
						{...titleProps}
					/>

					<Mx
						data-ui="Status-[Tx-message]"
						label={textMessage}
						{...messageProps}
					/>
				</Container>
			</Container>

			{action && (
				<Container
					data-ui="Status-[Container.action]"
					ui={{
						layout: "vertical-flex",
						items: "center",
						justify: "center",
						gap: "default",
					}}
				>
					{action}
				</Container>
			)}

			{children}
		</div>
	);
};
