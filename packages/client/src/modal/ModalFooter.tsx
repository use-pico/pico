import { tvc } from "@use-pico/cls";
import { type FC, useContext } from "react";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { ConfirmIcon } from "../icon/ConfirmIcon";
import { ModalContext } from "./ModalContext";

export namespace ModalFooter {
	export interface Props {
		/**
		 * Function to execute when confirming the action
		 */
		onConfirm?(): void;
		/**
		 * Function to execute when canceling/going back
		 */
		onCancel?(): void;
		/**
		 * Whether the confirm button should be disabled
		 */
		disabled?: boolean;
		/**
		 * Whether the confirm button should show loading state
		 */
		loading?: boolean;
		/**
		 * Custom text for the cancel button
		 */
		cancelText?: string;
		/**
		 * Custom text for the confirm button
		 */
		confirmText?: string;
		/**
		 * Custom icon for the cancel button
		 */
		cancelIcon?: string;
		/**
		 * Custom icon for the confirm button
		 */
		confirmIcon?: string;
		/**
		 * Custom CSS classes for the footer container
		 */
		className?: string;
		/**
		 * Whether to show the footer (defaults to true)
		 */
		show?: boolean;
	}

	export interface PropsEx extends Omit<Props, "close"> {}
}

export const ModalFooter: FC<ModalFooter.Props> = ({
	onConfirm,
	onCancel,
	disabled = false,
	loading = false,
	cancelText = "Close (label)",
	confirmText = "Confirm selection (label)",
	cancelIcon = BackIcon,
	confirmIcon = ConfirmIcon,
	className,
	show = true,
}) => {
	const useModal = useContext(ModalContext);
	const close = useModal((state) => state.close);

	if (!show) {
		return null;
	}

	const handleCancel = () => {
		onCancel?.();
		close();
	};

	const handleConfirm = () => {
		onConfirm?.();
		close();
	};

	return (
		<div
			className={tvc(
				"flex",
				"items-center",
				"justify-between",
				"gap-2",
				"border-t-2",
				"border-slate-100",
				"mt-4",
				"pt-2",
				className,
			)}
		>
			<Button
				iconEnabled={cancelIcon}
				iconDisabled={cancelIcon}
				onClick={handleCancel}
				label={cancelText}
				tweak={{
					variant: {
						tone: "neutral",
						theme: "light",
					},
				}}
				size={"md"}
			/>

			<Button
				iconEnabled={confirmIcon}
				iconDisabled={confirmIcon}
				disabled={disabled}
				loading={loading}
				onClick={handleConfirm}
				label={confirmText}
				size={"lg"}
			/>
		</div>
	);
};
