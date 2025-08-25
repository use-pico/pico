import { useCls } from "@use-pico/cls";
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
		icon?: Icon.Type;
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
	cls,
	tva = AlertCls,
	children,
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			clickable: Boolean(onClick),
		}),
	}));

	return (
		<div
			className={slots.base()}
			onClick={onClick}
			role={"alert"}
		>
			<div className={slots.header()}>
				{icon && (
					<Icon
						icon={icon}
						cls={({ what }) => ({
							variant: what.variant({
								size: "2xl",
							}),
						})}
						{...iconProps}
					/>
				)}
				<div className={slots.title()}>{title}</div>
			</div>
			{message && <div className={slots.message()}>{message}</div>}
			{children && <div className={slots.body()}>{children}</div>}
		</div>
	);
};
