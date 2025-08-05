import { useRouterState } from "@tanstack/react-router";
import { tvc } from "@use-pico/cls";
import { type FC, useEffect, useState } from "react";

export namespace NavigationIndicator {
	export type Props = {};
}

export const NavigationIndicator: FC<NavigationIndicator.Props> = () => {
	const { status } = useRouterState();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		/**
		 * We don't care about any here, just removed dependency on `NodeJS.Timeout`.
		 */
		let timeout: any | undefined;

		if (status === "pending") {
			timeout = setTimeout(() => {
				setVisible(true);
			}, 50);
		} else {
			setVisible(false);
			clearTimeout(timeout);
		}

		return () => clearTimeout(timeout);
	}, [
		status,
	]);

	return visible ? (
		<div
			className={tvc([
				"fixed",
				"top-0",
				"left-0",
				"right-0",
				"w-full",
				"h-1",
				"bg-sky-500",
				"z-[500]",
				"animate-pulse",
			])}
		/>
	) : null;
};
