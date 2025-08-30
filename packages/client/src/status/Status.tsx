import { withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { Typo } from "../typo/Typo";
import { StatusCls } from "./StatusCls";

export namespace Status {
	export interface Props extends StatusCls.Props<PropsWithChildren> {
		textTitle: ReactNode;
		textMessage: ReactNode;
		icon?: Icon.Type;
		iconProps?: Icon.PropsEx;
		titleProps?: Typo.PropsEx;
		messageProps?: Typo.PropsEx;
		bodyProps?: Typo.PropsEx;
	}
}

export const BaseStatus: FC<Status.Props> = ({
	textTitle,
	textMessage,
	icon,
	iconProps,
	titleProps,
	messageProps,
	bodyProps,
	tva = StatusCls,
	cls,
	children,
}) => {
	const slots = tva.create(cls);

	return (
		<div className={slots.root()}>
			<Icon
				icon={icon}
				size="xl"
				cls={({ what }) => ({
					slot: what.slot({
						root: what.css([
							"opacity-50",
						]),
					}),
				})}
				{...iconProps}
			/>

			<Typo
				label={textTitle}
				size="xl"
				font="bold"
				{...titleProps}
			/>
			<Typo
				label={textMessage}
				{...messageProps}
			/>
			<Typo
				label={children}
				{...bodyProps}
			/>
		</div>
	);
};

export const Status = withCls(BaseStatus, StatusCls);
