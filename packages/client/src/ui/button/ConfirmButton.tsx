import React, { type FC, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { uiButton } from "./uiButton";

export namespace ConfirmButton {
	export interface Props extends Button.Props {
		/**
		 * Props for the initial button state.
		 * These override the base props for the default state.
		 */
		buttonProps?: Partial<Button.Props>;
		/**
		 * Props for the confirmed button state.
		 * These override the base props for the confirm state.
		 */
		confirmProps?: Partial<Button.Props>;
		/**
		 * Timeout in milliseconds before resetting the confirm state.
		 * @default 3000
		 */
		confirmTimeout?: number;
		/**
		 * Callback function to reset the confirm state.
		 */
		onReset?(): void;
	}
}

export const ConfirmButton: FC<ConfirmButton.Props> = ({
	buttonProps,
	confirmProps,
	confirmTimeout = 3000,
	onReset,
	ui,
	...props
}) => {
	const [isConfirm, setIsConfirm] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (!isConfirm) {
			buttonProps?.onClick?.(event);
			setIsConfirm(true);
			timeoutRef.current = setTimeout(() => {
				setIsConfirm(false);
				timeoutRef.current = undefined;
				onReset?.();
			}, confirmTimeout);
			return;
		}

		clearTimeout(timeoutRef.current);
		timeoutRef.current = undefined;

		setIsConfirm(false);

		confirmProps?.onClick?.(event);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const conditionalProps = isConfirm ? confirmProps : buttonProps;

	return (
		<Button
			{...props}
			{...conditionalProps}
			{...uiButton({
				ui: {
					...ui,
					...conditionalProps?.ui,
				},
				className: [],
			})}
			onClick={handleClick}
		/>
	);
};
