import { withCls } from "@use-pico/cls";
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
		disabled?: boolean;
	}
}

export const BaseActionClick: FC<ActionClick.Props> = ({
	icon,
	iconProps,
	loading = false,
	disabled = false,
	tva = ActionClickCls,
	cls,
	children,
	...props
}) => {
	const slots = tva.create(cls, ({ what }) => ({
		variant: what.variant({
			loading,
			disabled,
		}),
	}));

	return (
		<div className={slots.wrapper()}>
			<div
				className={slots.root()}
				{...props}
			>
				<Icon
					icon={loading ? LoaderIcon : icon}
					size={"sm"}
					{...iconProps}
				/>
				{children}
			</div>
		</div>
	);
};

export const ActionClick = withCls(BaseActionClick, ActionClickCls);
