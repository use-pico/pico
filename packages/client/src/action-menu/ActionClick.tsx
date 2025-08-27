import type { FC, HTMLAttributes } from "react";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { ActionClickCls } from "./ActionClickCls";

export namespace ActionClick {
	export interface Props
		extends ActionClickCls.Props<HTMLAttributes<HTMLDivElement>> {
		icon?: Icon.Type;
		iconProps?: Icon.Props;
		loading?: boolean;
	}
}

export const ActionClick: FC<ActionClick.Props> = ({
	icon,
	iconProps,
	loading = false,
	tva = ActionClickCls,
	cls,
	children,
	...props
}) => {
	const classes = tva.create(cls, ({ what }) => ({
		variant: what.variant({
			loading,
		}),
	}));

	return (
		<div
			className={classes.root()}
			{...props}
		>
			<Icon
				icon={loading ? LoaderIcon : icon}
				size={"sm"}
				{...iconProps}
			/>
			{children}
		</div>
	);
};
