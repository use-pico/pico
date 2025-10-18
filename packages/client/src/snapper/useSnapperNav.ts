import { clamp } from "@use-pico/common";
import {
	type RefObject,
	useCallback,
	useEffect,
	useEffectEvent,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

export namespace useSnapperNav {
	export interface Props {
		/**
		 * Scrollable container ref.
		 */
		containerRef: RefObject<HTMLElement | null>;
		/**
		 * Scroll axis.
		 */
		orientation: "horizontal" | "vertical";
		/**
		 * Total page count (SSR-friendly).
		 */
		count: number;
		/**
		 * Initial page index (0-based).
		 */
		defaultIndex?: number;
		/**
		 * Quantization threshold 0..1; default 0.5.
		 */
		threshold?: number;
		/**
		 * Called when a new page index is derived.
		 */
		onSnap?: (index: number) => void;
	}

	/**
	 * Page index or a CSS selector scoped to the container.
	 */
	export type SnapTarget = number | string;

	export interface Result {
		current: number;
		count: number;
		isFirst: boolean;
		isLast: boolean;
		start: () => void;
		end: () => void;
		next: () => void;
		prev: () => void;
		snapTo: (target: SnapTarget, behavior?: ScrollBehavior) => void;
	}
}

/**
 * Page snap navigator driven by a fixed `count`.
 * A "page" equals the container viewport (clientWidth/Height).
 */
export function useSnapperNav({
	containerRef,
	orientation,
	count,
	defaultIndex = 0,
	threshold = 0.5,
	onSnap,
}: useSnapperNav.Props): useSnapperNav.Result {
	const $count = Math.max(1, Math.floor(count));
	const isVertical = orientation === "vertical";
	const $threshold = clamp(threshold, 0, 1);

	/**
	 * Current page (state) + live ref for handlers to avoid stale closures.
	 */
	const [current, setCurrent] = useState(() => {
		const last = Math.max(0, $count - 1);
		return clamp(defaultIndex, 0, last);
	});
	const currentRef = useRef(current);
	currentRef.current = current;

	/**
	 * Stable "effect event" for `onSnap`.
	 * Always observes latest props/state without retriggering subscriptions.
	 */
	const emitSnap = useEffectEvent((idx: number) => {
		onSnap?.(idx);
	});

	/**
	 * Read container metrics (page size, scroll position, total content size).
	 */
	const metrics = useCallback(() => {
		const host = containerRef.current;

		if (!host) {
			return {
				pageSize: 1,
				position: 0,
				totalSize: 1,
			};
		}

		const pageSize = isVertical ? host.clientHeight : host.clientWidth;
		const position = isVertical ? host.scrollTop : host.scrollLeft;
		const totalSize = isVertical ? host.scrollHeight : host.scrollWidth;

		return {
			pageSize: Math.max(1, pageSize),
			position,
			totalSize: Math.max(1, totalSize),
		};
	}, [
		containerRef,
		isVertical,
	]);

	/**
	 * Quantize scroll position to a page index using threshold.
	 */
	const quantizeToPageIndex = useCallback(
		(position: number, pageSize: number, pageCount: number) => {
			const raw = (position + pageSize * $threshold) / pageSize;
			const floor = Math.floor(raw);
			const last = pageCount - 1;
			return clamp(floor, 0, last);
		},
		[
			$threshold,
		],
	);

	/**
	 * Lift any descendant to the nearest direct child of the container.
	 */
	const toDirectChild = useCallback(
		(node: Element | null): HTMLElement | null => {
			const host = containerRef.current;

			if (!host || !node) {
				return null;
			}

			let cursor: Element | null = node;

			while (cursor && cursor.parentElement !== host) {
				cursor = cursor.parentElement;
			}

			if (!cursor || cursor.parentElement !== host) {
				return null;
			}

			return cursor as HTMLElement;
		},
		[
			containerRef,
		],
	);

	/**
	 * Programmatic scroll to page (by index or selector).
	 */
	const snapTo = useCallback(
		(
			target: useSnapperNav.SnapTarget,
			behavior: ScrollBehavior = "smooth",
		) => {
			const host = containerRef.current;

			if (!host) {
				return;
			}

			let pageIndex: number | null = null;

			if (typeof target === "number") {
				pageIndex = clamp(Math.floor(target), 0, $count - 1);
			} else {
				const found = host.querySelector(target);
				const child = toDirectChild(found);

				if (!child) {
					console.warn(
						`useSnapperNav: selector not found or not inside container: "${String(target)}"`,
					);
					return;
				}

				const { pageSize } = metrics();
				const offset = isVertical ? child.offsetTop : child.offsetLeft;
				pageIndex = clamp(Math.floor(offset / pageSize), 0, $count - 1);
			}

			const { pageSize, totalSize } = metrics();
			const maxScroll = Math.max(0, totalSize - pageSize);
			const targetPosition = clamp(
				(pageIndex ?? 0) * pageSize,
				0,
				maxScroll,
			);

			if (isVertical) {
				host.scrollTo({
					top: targetPosition,
					behavior,
				});
			} else {
				host.scrollTo({
					left: targetPosition,
					behavior,
				});
			}

			emitSnap(pageIndex ?? 0);
		},
		[
			containerRef,
			isVertical,
			$count,
			metrics,
			toDirectChild,
			emitSnap,
		],
	);

	const start = useCallback(() => {
		snapTo(0);
	}, [
		snapTo,
	]);

	const end = useCallback(() => {
		snapTo($count - 1);
	}, [
		snapTo,
		$count,
	]);

	const next = useCallback(() => {
		snapTo(currentRef.current + 1);
	}, [
		snapTo,
	]);

	const prev = useCallback(() => {
		snapTo(currentRef.current - 1);
	}, [
		snapTo,
	]);

	/**
	 * Mount/host-swap synchronizer.
	 *
	 * Responsibilities:
	 *  - Compute a safe initial page (clamped by `$count`) and snap without animation
	 *    so the scroll position matches the intended `defaultIndex`.
	 *  - Immediately re-derive `current` from actual DOM metrics to guard against
	 *    off-by-one/layout races (e.g., fonts/scrollbar geometry).
	 *
	 * Invariants:
	 *  - Never reads `containerRef.current` in deps; uses it synchronously.
	 *  - Keeps `snapTo` stable and animationless ("auto") for the initial jump.
	 */
	useLayoutEffect(() => {
		const el = containerRef.current;

		if (!el) {
			return;
		}

		const last = Math.max(0, $count - 1);
		const initial = clamp(defaultIndex, 0, last);

		if (initial !== currentRef.current) {
			snapTo(initial, "auto");
		}

		const { pageSize, position } = metrics();
		const idx = quantizeToPageIndex(position, pageSize, $count);

		if (idx !== currentRef.current) {
			currentRef.current = idx;
			setCurrent(idx);
		}
	}, [
		containerRef,
		defaultIndex,
		$count,
		snapTo,
		metrics,
		quantizeToPageIndex,
	]);

	/**
	 * Scroll subscription.
	 *
	 * Responsibilities:
	 *  - Attach a passive `scroll` listener to the host.
	 *  - On every scroll, derive the page index from live metrics and update
	 *    `current` only on change (prevents render storms).
	 *  - Emit `onSnap` via `emitSnap` so consumers see latest props/state without
	 *    resubscribing the listener when `onSnap` identity changes.
	 *
	 * Performance:
	 *  - Listener is stable; avoids re-binding on prop churn.
	 *  - Uses integer quantization with threshold to minimize flicker near edges.
	 */
	useEffect(() => {
		const el = containerRef.current;

		if (!el) {
			return;
		}

		const host: HTMLElement = el;

		function onScroll() {
			const { pageSize, position } = metrics();
			const idx = quantizeToPageIndex(position, pageSize, $count);

			if (idx !== currentRef.current) {
				currentRef.current = idx;
				setCurrent(idx);
				emitSnap(idx);
			}
		}

		host.addEventListener("scroll", onScroll, {
			passive: true,
		});

		return () => {
			host.removeEventListener("scroll", onScroll);
		};
	}, [
		containerRef,
		$count,
		metrics,
		quantizeToPageIndex,
		emitSnap,
	]);

	/**
	 * ResizeObserver subscription.
	 *
	 * Responsibilities:
	 *  - Re-derive `current` when the host's layout changes (mobile address bars,
	 *    orientation changes, virtual keyboard).
	 *  - If shrinking invalidates the current index (now > last), snap back
	 *    instantly without animation.
	 */
	useEffect(() => {
		const el = containerRef.current;

		if (!el) {
			return;
		}

		const host: HTMLElement = el;

		const resizeObserver = new ResizeObserver(() => {
			const { pageSize, position } = metrics();
			const idx = quantizeToPageIndex(position, pageSize, $count);

			if (idx !== currentRef.current) {
				currentRef.current = idx;
				setCurrent(idx);
			}

			const last = Math.max(0, $count - 1);

			if (currentRef.current > last) {
				snapTo(last, "auto");
			}
		});

		resizeObserver.observe(host);

		return () => {
			resizeObserver.disconnect();
		};
	}, [
		containerRef,
		$count,
		metrics,
		quantizeToPageIndex,
		snapTo,
	]);

	/**
	 * Runtime `count` changes.
	 *
	 * Responsibility:
	 *  - Clamp `current` to the new `[0, $count-1]` range and snap if needed.
	 */
	useEffect(() => {
		const last = Math.max(0, $count - 1);

		if (currentRef.current > last) {
			currentRef.current = last;
			setCurrent(last);
			snapTo(last, "auto");
		}
	}, [
		$count,
		snapTo,
	]);

	const isFirst = current === 0;
	const isLast = current === Math.max(0, $count - 1);

	return {
		current,
		count: $count,
		isFirst,
		isLast,
		start,
		end,
		next,
		prev,
		snapTo,
	};
}
