import { type RefObject, useCallback, useEffect, useState } from "react";

export namespace useSnapperNav {
	export interface Props {
		containerRef: RefObject<HTMLElement | null>;
		orientation: "horizontal" | "vertical";
		defaultIndex?: number;
	}

	export interface Result {
		current: number;
		isFirst: boolean;
		isLast: boolean;
		start: () => void;
		end: () => void;
		next: () => void;
		prev: () => void;
		snapTo: (index: number, behavior?: ScrollBehavior) => void;
	}
}

/**
 * Hook for managing snap navigation through a scrollable container.
 *
 * The number of snap positions is automatically determined by the number of
 * direct children in the container. Children are expected to be sized
 * responsively (e.g., w-full, h-full) to match the container's dimensions.
 *
 * The count is automatically updated when children are added or removed.
 */
export function useSnapperNav({
	containerRef,
	orientation,
	defaultIndex = 0,
}: useSnapperNav.Props): useSnapperNav.Result {
	const [current, setCurrent] = useState(() => {
		const count = containerRef.current
			? Math.max(1, containerRef.current.children.length)
			: 1;
		return Math.min(defaultIndex, Math.max(0, count - 1));
	});

	// Compute count once per render for use in return statement
	const count = containerRef.current
		? Math.max(1, containerRef.current.children.length)
		: 1;

	const snapTo = useCallback(
		(index: number, behavior: ScrollBehavior = "smooth") => {
			const container = containerRef.current;
			if (!container) {
				return;
			}

			const clampedIndex = Math.max(0, Math.min(count - 1, index));
			setCurrent(clampedIndex);

			const item = container.children[clampedIndex] as HTMLElement | null;
			if (!item) {
				console.warn(
					"useSnapperNav: Item at index not found - does the container contain only the tracked children?",
				);
				return;
			}

			container.scrollTo(
				orientation === "vertical"
					? {
							top: item.offsetTop,
							behavior,
						}
					: {
							left: item.offsetLeft,
							behavior,
						},
			);
		},
		[
			containerRef,
			orientation,
			count,
		],
	);

	const start = useCallback(() => {
		snapTo(0);
	}, [
		snapTo,
	]);

	const end = useCallback(() => {
		snapTo(count - 1);
	}, [
		snapTo,
		count,
	]);

	const next = useCallback(() => {
		if (current < count - 1) {
			snapTo(current + 1);
		}
	}, [
		current,
		snapTo,
		count,
	]);

	const prev = useCallback(() => {
		if (current > 0) {
			snapTo(current - 1);
		}
	}, [
		current,
		snapTo,
	]);

	useEffect(() => {
		snapTo(current, "auto");
	}, [
		current,
		snapTo,
	]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const onScroll = () => {
			const size =
				orientation === "vertical"
					? container.clientHeight
					: container.clientWidth;
			const pos =
				orientation === "vertical"
					? container.scrollTop
					: container.scrollLeft;
			const idx = Math.max(
				0,
				Math.min(count - 1, Math.round(pos / Math.max(1, size))),
			);
			setCurrent((prev) => (idx !== prev ? idx : prev));
		};

		container.addEventListener("scroll", onScroll, {
			passive: true,
		});

		return () => {
			container.removeEventListener("scroll", onScroll);
		};
	}, [
		containerRef,
		orientation,
		count,
	]);

	return {
		current,
		isFirst: current === 0,
		isLast: current === count - 1,
		start,
		end,
		next,
		prev,
		snapTo,
	};
}
