import { useCls, type VariantOf, withCls } from "@use-pico/cls";
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
		tone?: VariantOf<StatusCls, "tone">;
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
	tone = "inherit",
	tva = StatusCls,
	cls,
	children,
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			tone,
		}),
	}));

	return (
		<div className={slots.root()}>
			<Icon
				icon={icon}
				size="xl"
				tone={tone}
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
				tone={tone}
				{...titleProps}
			/>
			<Typo
				label={textMessage}
				tone={tone}
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
