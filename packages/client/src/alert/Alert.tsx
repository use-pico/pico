import type { FC, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { AlertCss } from "./AlertCss";

/**
 * Display simple alert with various available variants.
 *
 * You may specify an icon, title and optional message.
 *
 * @group ui
 */
export namespace Alert {
	export interface Props extends AlertCss.Props<PropsWithChildren> {
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
	tva = AlertCss,
	css,
	children,
}) => {
	const tv = tva({ clickable: Boolean(onClick), ...variant, css }).slots;
	return (
		<div
			className={tv.base()}
			onClick={onClick}
		>
			<div className={"flex items-center gap-2 w-full"}>
				{icon && (
					<Icon
						icon={icon}
						variant={{ size: "2xl" }}
						{...iconProps}
					/>
				)}
				<div className={tv.title()}>{title}</div>
			</div>
			{message && <div className={tv.message()}>{message}</div>}
			{children && <div className={tv.body()}>{children}</div>}
		</div>
	);
};
