import type { FC, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { StatusCls } from "./StatusCls";

export namespace Status {
	export interface Props extends StatusCls.Props<PropsWithChildren> {
		textTitle: ReactNode;
		textMessage: ReactNode;
		icon?: Icon.Props["icon"];
		iconProps?: Icon.PropsEx;
	}
}

export const Status: FC<Status.Props> = ({
	textTitle,
	textMessage,
	icon,
	iconProps,
	variant,
	tva = StatusCls,
	cls,
	children,
}) => {
	const { slots } = tva(variant, cls);

	return (
		<div className={slots.base()}>
			{icon ? (
				<Icon
					icon={icon}
					variant={{
						size: "6xl",
					}}
					cls={{
						base: [
							"text-slate-500",
							"opacity-50",
						],
					}}
					{...iconProps}
				/>
			) : null}
			<div className={slots.title()}>{textTitle}</div>
			<div className={slots.message()}>{textMessage}</div>
			<div className={slots.body()}>{children}</div>
		</div>
	);
};
