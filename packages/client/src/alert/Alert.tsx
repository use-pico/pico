import type { FC, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { AlertCls } from "./AlertCls";

/**
 * Display simple alert with various available variants.
 *
 * You may specify an icon, title and optional message.
 *
 * @group ui
 */
export namespace Alert {
	export interface Props extends AlertCls.Props<PropsWithChildren> {
		icon?: string;
		iconProps?: Icon.PropsEx;
		title?: ReactNode;
		message?: ReactNode;
		onClick?(): void;
	}
}

export const Alert: FC<Alert.Props> = ({
	icon,
	iconProps,
	title,
	message,
	onClick,
	variant,
	tva = AlertCls,
	cls,
	children,
}) => {
	const { el } = tva(
		{
			clickable: Boolean(onClick),
			...variant,
		},
		cls,
	);
	return (
		<el.base.Div
			onClick={onClick}
			role={"alert"}
		>
			<div className={"flex items-center gap-2 w-full"}>
				{icon && (
					<Icon
						icon={icon}
						variant={{
							size: "2xl",
						}}
						{...iconProps}
					/>
				)}
				<el.title.Div>{title}</el.title.Div>
			</div>
			{message && <el.message.Div>{message}</el.message.Div>}
			{children && <el.body.Div>{children}</el.body.Div>}
		</el.base.Div>
	);
};
