import { isString } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { Modal } from "../modal/Modal";
import { ActionModalCss } from "./ActionModalCss";

export namespace ActionModal {
	export interface Props
		extends ActionModalCss.Props<Omit<Modal.Props, "target">> {
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
	tva = ActionModalCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, disabled, css }).slots;

	return hidden ? null : (
			<div className={tv.base()}>
				{isString(icon) ?
					<Icon
						icon={icon}
						{...iconProps}
					/>
				:	icon}
				<Modal
					icon={icon}
					target={label}
					disabled={disabled}
					css={{
						modal: ["w-1/2"],
					}}
					{...props}
				/>
			</div>
		);
};
