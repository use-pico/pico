import { isString } from "@use-pico/common";
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
	variant,
	tva = ActionModalCls,
	cls,
	...props
}) => {
	const { slots } = tva(
		{
			...variant,
			disabled,
		},
		cls,
	);

	return hidden ? null : (
		<div className={slots.base()}>
			<Modal
				icon={icon}
				target={
					<div className={"flex flex-row gap-2 items-center"}>
						{isString(icon) ? (
							<Icon
								icon={icon}
								{...iconProps}
							/>
						) : (
							icon
						)}
						{label}
					</div>
				}
				disabled={disabled}
				cls={{
					modal: [
						"w-2/3",
					],
				}}
				{...props}
			/>
		</div>
	);
};
