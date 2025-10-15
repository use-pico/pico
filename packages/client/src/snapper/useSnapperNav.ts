import { type RefObject, useCallback, useEffect, useState } from "react";

export namespace useSnapperNav {
	export interface Props {
		containerRef: RefObject<HTMLElement | null>;
		orientation: "horizontal" | "vertical";
		count: number;
		defaultIndex?: number;
	}

	export interface Result {
		current: number;
		isFirst: boolean;
		isLast: boolean;
		start: () => void;
		end: () => void;
		snapTo: (index: number, behavior?: ScrollBehavior) => void;
	}
}

export function useSnapperNav({
	containerRef,
	orientation,
	count,
	defaultIndex = 0,
}: useSnapperNav.Props): useSnapperNav.Result {
	const [current, setCurrent] = useState(() =>
		Math.min(defaultIndex, Math.max(0, count - 1)),
	);

	const snapTo = useCallback(
		(index: number, behavior: ScrollBehavior = "smooth") => {
			const container = containerRef.current;
			if (!container) {
				return;
			}

			const clampedIndex = Math.max(0, Math.min(count - 1, index));
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: Intentional - one shot execution
	useEffect(() => {
		snapTo(current, "auto");
	}, []);

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
			if (idx !== current) {
				setCurrent(idx);
			}
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
		current,
	]);

	return {
		current,
		isFirst: current === 0,
		isLast: current === count - 1,
		start,
		end,
		snapTo,
	};
}
