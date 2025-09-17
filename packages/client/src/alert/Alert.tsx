import { useCls, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode, Ref } from "react";
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
		ref?: Ref<HTMLDivElement>;
		icon?: Icon.Type;
		iconProps?: Icon.PropsEx;
		title?: ReactNode;
		message?: ReactNode;
		onClick?(): void;
	}
}

export const BaseAlert: FC<Alert.Props> = ({
	ref,
	icon,
	iconProps,
	title,
	message,
	onClick,
	tweak,
	cls = AlertCls,
	children,
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			clickable: Boolean(onClick),
		}),
	}));

	return (
		<div
			ref={ref}
			data-ui="Alert-root"
			className={slots.root()}
			onClick={onClick}
			role={"alert"}
		>
			<div
				data-ui="Alert-header"
				className={slots.header()}
			>
				{icon && (
					<Icon
						icon={icon}
						size={"sm"}
						{...iconProps}
					/>
				)}
				<div
					data-ui="Alert-title"
					className={slots.title()}
				>
					{title}
				</div>
			</div>
			{message && (
				<div
					data-ui="Alert-message"
					className={slots.message()}
				>
					{message}
				</div>
			)}
			{children && (
				<div
					data-ui="Alert-body"
					className={slots.body()}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export const Alert = withCls(BaseAlert, AlertCls);
