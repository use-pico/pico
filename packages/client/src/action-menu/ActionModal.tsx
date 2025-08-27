import { useCls } from "@use-pico/cls";
import type { FC, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { Modal } from "../modal/Modal";
import { ActionModalCls } from "./ActionModalCls";

export namespace ActionModal {
	export interface Props
		extends ActionModalCls.Props<Omit<Modal.Props, "target">> {
		iconProps?: Icon.Props;
		label: ReactNode;
		disabled?: boolean;
		hidden?: boolean;
	}
}

export const ActionModal: FC<ActionModal.Props> = ({
	icon,
	iconProps,
	label,
	disabled = false,
	hidden = false,
	tva = ActionModalCls,
	cls,
	...props
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			disabled,
		}),
	}));

	return hidden ? null : (
		<div className={slots.root()}>
			<Modal
				icon={icon}
				target={
					<div className={"flex flex-row gap-2 items-center"}>
						<Icon
							icon={icon}
							size={"sm"}
							{...iconProps}
						/>
						{label}
					</div>
				}
				disabled={disabled}
				size={"lg"}
				{...props}
			/>
		</div>
	);
};
