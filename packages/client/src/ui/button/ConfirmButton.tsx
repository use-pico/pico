import React, { type FC, useEffect, useRef, useState } from "react";
import { Button } from "./Button";

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
	}
}

export const ConfirmButton: FC<ConfirmButton.Props> = ({
	buttonProps,
	confirmProps,
	confirmTimeout = 3000,
	...props
}) => {
	const [isConfirm, setIsConfirm] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (!isConfirm) {
			buttonProps?.onClick?.(event);
			setIsConfirm(true);
			timeoutRef.current = setTimeout(() => {
				setIsConfirm(false);
				timeoutRef.current = null;
			}, confirmTimeout);
			return;
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		confirmProps?.onClick?.(event);
		setIsConfirm(false);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<Button
			{...props}
			{...(isConfirm ? confirmProps : buttonProps)}
			onClick={handleClick}
		/>
	);
};
