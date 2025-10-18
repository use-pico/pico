import {
	type RefObject,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export namespace useSnapperNav {
	export interface Props {
		containerRef: RefObject<HTMLElement | null>;
		orientation: "horizontal" | "vertical";
		count: number; // REQUIRED: total page count (SSR-friendly)
		defaultIndex?: number; // initial page index (0-based)
		threshold?: number; // 0..1; 0.5 ≈ Math.round; default 0.5
	}

	export type SnapTarget = number | string; // page index OR CSS selector (within container)

	export interface Result {
		current: number; // current page (0-based)
		count: number; // echo the provided count (normalized to >=1)
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
 * SSR-friendly page navigator (count is provided by the caller).
 *
 * Model:
 * - A "page" equals the container viewport (clientWidth/Height).
 * - `count` is owned by the caller, so server and client render match.
 *
 * Behavior:
 * - `snapTo(number)` scrolls to that page (clamped to [0 .. count-1]).
 * - `snapTo(selector)` finds the first match inside the container, lifts it
 *   to the nearest direct child, and scrolls to the page where that child starts.
 *
 * Notes:
 * - No rAF; scroll is handled synchronously (passive listener).
 * - We use refs for `current` in handlers to avoid stale closures.
 * - We never depend on `containerRef.current` in deps (anti-pattern).
 */
export function useSnapperNav({
	containerRef,
	orientation,
	count,
	defaultIndex = 0,
	threshold = 0.5,
}: useSnapperNav.Props): useSnapperNav.Result {
	// Normalize props once per render (cheap), memoize where it matters.
	const normalizedCount = useMemo(
		() => Math.max(1, Math.floor(count)),
		[
			count,
		],
	);
	const isVertical = orientation === "vertical";
	const thresholdClamped = Math.min(1, Math.max(0, threshold));

	// State + live refs for handler closures.
	const [current, setCurrent] = useState(() => {
		const last = Math.max(0, normalizedCount - 1);
		return Math.max(0, Math.min(last, defaultIndex));
	});
	const currentRef = useRef(current);
	currentRef.current = current;

	// --- helpers (memoized) ----------------------------------------------------

	/** Read container metrics (page size, scroll position, total content size). */
	const readMetrics = useCallback(() => {
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

	/** Quantize scroll position to a page index using threshold. */
	const quantizeToPageIndex = useCallback(
		(position: number, pageSize: number, pageCount: number) => {
			const raw = (position + pageSize * thresholdClamped) / pageSize;
			let index = Math.floor(raw);
			if (index < 0) {
				index = 0;
			} else if (index > pageCount - 1) {
				index = pageCount - 1;
			}
			return index;
		},
		[
			thresholdClamped,
		],
	);

	/** Lift any descendant to the nearest direct child of the container. */
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

	// --- API (memoized) --------------------------------------------------------

	/** Programmatic scroll to page (by index or selector). */
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
				pageIndex = Math.max(
					0,
					Math.min(normalizedCount - 1, Math.floor(target)),
				);
			} else {
				const found = host.querySelector(target);
				const child = toDirectChild(found);
				if (!child) {
					// eslint-disable-next-line no-console
					console.warn(
						`useSnapperNav: selector not found or not inside container: "${String(target)}"`,
					);
					return;
				}
				const { pageSize } = readMetrics();
				const offset = isVertical ? child.offsetTop : child.offsetLeft;
				pageIndex = Math.floor(offset / pageSize);
				if (pageIndex < 0) {
					pageIndex = 0;
				} else if (pageIndex > normalizedCount - 1) {
					pageIndex = normalizedCount - 1;
				}
			}

			const { pageSize, totalSize } = readMetrics();
			const maxScroll = Math.max(0, totalSize - pageSize);
			const targetPosition = Math.min(
				(pageIndex ?? 0) * pageSize,
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
		},
		[
			containerRef,
			isVertical,
			normalizedCount,
			readMetrics,
			toDirectChild,
		],
	);

	const start = useCallback(() => {
		snapTo(0);
	}, [
		snapTo,
	]);

	const end = useCallback(() => {
		snapTo(Math.max(0, normalizedCount - 1));
	}, [
		snapTo,
		normalizedCount,
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

	// --- effects ---------------------------------------------------------------

	/** Initial snap (no animation) and sync of `current` after mount/node swap. */
	useLayoutEffect(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}
		const host: HTMLElement = el;

		const last = Math.max(0, normalizedCount - 1);
		const initial = Math.max(0, Math.min(last, defaultIndex));
		// Snap first so the position matches desired initial page.
		if (initial !== currentRef.current) {
			snapTo(initial, "auto");
		}

		// Derive current from actual position to be extra sure.
		const { pageSize, position } = readMetrics();
		const idx = quantizeToPageIndex(position, pageSize, normalizedCount);
		if (idx !== currentRef.current) {
			currentRef.current = idx;
			setCurrent(idx);
		}

		// Cleanup is N/A (listeners are in the next effects).
	}, [
		containerRef,
		defaultIndex,
		normalizedCount,
		snapTo,
		readMetrics,
		quantizeToPageIndex,
	]);

	/** Scroll → derive `current`. */
	useEffect(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}
		const host: HTMLElement = el;

		function onScroll() {
			const { pageSize, position } = readMetrics();
			const idx = quantizeToPageIndex(
				position,
				pageSize,
				normalizedCount,
			);
			if (idx !== currentRef.current) {
				currentRef.current = idx;
				setCurrent(idx);
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
		normalizedCount,
		readMetrics,
		quantizeToPageIndex,
	]);

	/** Resize → re-derive `current` (address bars, rotations, etc.). */
	useEffect(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}
		const host: HTMLElement = el;

		const resizeObserver = new ResizeObserver(() => {
			const { pageSize, position } = readMetrics();
			const idx = quantizeToPageIndex(
				position,
				pageSize,
				normalizedCount,
			);
			if (idx !== currentRef.current) {
				currentRef.current = idx;
				setCurrent(idx);
			}

			// If the viewport shrank and our current is out of range after clamping,
			// snap back without animation.
			const last = Math.max(0, normalizedCount - 1);
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
		normalizedCount,
		readMetrics,
		quantizeToPageIndex,
		snapTo,
	]);

	/** When `count` prop changes at runtime, clamp and optionally snap. */
	useEffect(() => {
		const last = Math.max(0, normalizedCount - 1);
		if (currentRef.current > last) {
			currentRef.current = last;
			setCurrent(last);
			snapTo(last, "auto");
		}
	}, [
		normalizedCount,
		snapTo,
	]);

	// --- derived flags (memoized) ---------------------------------------------

	const isFirst = useMemo(
		() => current === 0,
		[
			current,
		],
	);
	const isLast = useMemo(
		() => current === Math.max(0, normalizedCount - 1),
		[
			current,
			normalizedCount,
		],
	);

	return {
		current,
		count: normalizedCount,
		isFirst,
		isLast,
		start,
		end,
		next,
		prev,
		snapTo,
	};
}
