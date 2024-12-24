import { isString } from "@use-pico/common";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { Modal } from "../modal/Modal";
import { ActionModalCss } from "./ActionModalCss";

export namespace ActionModal {
	export interface Props extends ActionModalCss.Props<PropsWithChildren> {
		icon?: string | ReactNode;
		iconProps?: Icon.Props;
		label: ReactNode;
		textTitle?: ReactNode;
		modalProps?: Omit<Modal.Props, "target">;
	}
}

export const ActionModal: FC<ActionModal.Props> = ({
	icon,
	iconProps,
	label,
	textTitle,
	modalProps,
	variant,
	tva = ActionModalCss,
	css,
	children,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
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
				title={textTitle}
				{...modalProps}
			>
				{children}
			</Modal>
		</div>
	);
};
