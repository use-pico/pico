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
	cls,
	tva = AlertCls,
	children,
}) => {
	const classes = useCls(tva, cls, {
		variant: {
			clickable: Boolean(onClick),
		},
	});

	return (
		<div
			className={classes.base()}
			onClick={onClick}
			role={"alert"}
		>
			<div className={"flex items-center gap-2 w-full"}>
				{icon && (
					<Icon
						icon={icon}
						cls={{
							variant: {
								size: "2xl",
							},
						}}
						{...iconProps}
					/>
				)}
				<div className={classes.title()}>{title}</div>
			</div>
			{message && <div className={classes.message()}>{message}</div>}
			{children && <div className={classes.body()}>{children}</div>}
		</div>
	);
};
