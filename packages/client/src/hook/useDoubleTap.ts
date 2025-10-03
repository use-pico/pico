import { useCallback, useRef } from "react";

export namespace useDoubleTap {
	export interface Props {
		onDoubleTap: () => void;
		delay?: number;
	}
}

/**
 * Hook for handling double tap events on mobile devices.
 * Uses touch events to detect double taps with a configurable delay.
 */
export const useDoubleTap = ({
	onDoubleTap,
	delay = 300,
}: useDoubleTap.Props) => {
	const lastTapRef = useRef<number>(0);

	const handleTouchStart = useCallback(
		(event: React.TouchEvent) => {
			const currentTime = Date.now();
			const tapLength = currentTime - lastTapRef.current;

			if (tapLength < delay && tapLength > 0) {
				// Double tap detected
				event.preventDefault();
				onDoubleTap();
			}

			lastTapRef.current = currentTime;
		},
		[
			onDoubleTap,
			delay,
		],
	);

	return {
		onTouchStart: handleTouchStart,
	};
};
