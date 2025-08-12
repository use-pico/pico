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
	tva = StatusCls,
	cls,
	children,
}) => {
	const classes = tva.create(cls);

	return (
		<div className={classes.base()}>
			{icon ? (
				<Icon
					icon={icon}
					cls={({ what }) => ({
						variant: what.variant({
							size: "6xl",
						}),
						slot: what.slot({
							root: what.css([
								"opacity-50",
							]),
						}),
					})}
					{...iconProps}
				/>
			) : null}
			<div className={classes.title()}>{textTitle}</div>
			<div className={classes.message()}>{textMessage}</div>
			<div className={classes.body()}>{children}</div>
		</div>
	);
};
