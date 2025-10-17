import {
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

export namespace useSnapperNav {
	export interface Props {
		containerRef: RefObject<HTMLElement | null>;
		orientation: "horizontal" | "vertical";
		defaultIndex?: number; // initial page index
		threshold?: number; // 0..1; 0.5 ≈ Math.round; default 0.5
	}

	export type SnapTarget = number | string; // page index OR CSS selector (within container)

	export interface Result {
		current: number; // current page (0-based)
		count: number; // total page count
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
 * Page-based snap navigator with `snapTo(index | selector)` and threshold.
 *
 * Model:
 * - A "page" equals the container's viewport (clientWidth/Height).
 * - Page count = ceil(total / size).
 *
 * Behavior:
 * - `snapTo(number)` scrolls to that page.
 * - `snapTo(selector)` finds the first match inside the container, lifts it
 *   to the nearest direct child, and scrolls to the page where that child starts.
 *
 * Design:
 * - Single source of truth: `current` is derived from scroll (rAF-throttled).
 * - MutationObserver: track child list changes (direct children only).
 * - ResizeObserver: keep quantization correct on container size changes.
 */
export function useSnapperNav({
	containerRef,
	orientation,
	defaultIndex = 0,
	threshold: thresholdProp = 0.5,
}: useSnapperNav.Props): useSnapperNav.Result {
	const [current, setCurrent] = useState(0);
	const isVertical = orientation === "vertical";
	const threshold = Math.min(1, Math.max(0, thresholdProp));

	const pageCountRef = useRef(1);

	// -- utils ------------------------------------------------------------------

	/** Read container metrics (pageSize, scroll position, total content size). */
	const readMetrics = useCallback(() => {
		const containerElement = containerRef.current;
		if (!containerElement) {
			return {
				pageSize: 1,
				position: 0,
				totalSize: 1,
			};
		}
		const pageSize = isVertical
			? containerElement.clientHeight
			: containerElement.clientWidth;
		const position = isVertical
			? containerElement.scrollTop
			: containerElement.scrollLeft;
		const totalSize = isVertical
			? containerElement.scrollHeight
			: containerElement.scrollWidth;
		return {
			pageSize: Math.max(1, pageSize),
			position,
			totalSize: Math.max(1, totalSize),
		};
	}, [
		containerRef.current,
		isVertical,
	]);

	/** Quantize scroll position to a page index using threshold. */
	const quantizeToPageIndex = useCallback(
		(position: number, pageSize: number, pageCount: number) => {
			const index = Math.floor(
				(position + pageSize * threshold) / pageSize,
			);
			if (index < 0) {
				return 0;
			}
			if (index > pageCount - 1) {
				return pageCount - 1;
			}
			return index;
		},
		[
			threshold,
		],
	);

	/** Compute how many pages fit into the container. */
	const computePageCount = useCallback(() => {
		const { pageSize, totalSize } = readMetrics();
		return Math.max(1, Math.ceil(totalSize / pageSize));
	}, [
		readMetrics,
	]);

	/** Refresh internal page count. */
	const recomputePageCount = useCallback(() => {
		pageCountRef.current = computePageCount();
	}, [
		computePageCount,
	]);

	/** Lift any descendant to the nearest direct child of the container. */
	const toDirectChild = useCallback(
		(node: Element | null): HTMLElement | null => {
			const containerElement = containerRef.current;
			if (!containerElement) {
				return null;
			}
			if (!node) {
				return null;
			}
			let currentElement: Element | null = node;
			while (
				currentElement &&
				currentElement.parentElement !== containerElement
			) {
				currentElement = currentElement.parentElement;
			}
			if (!currentElement) {
				return null;
			}
			if (currentElement.parentElement !== containerElement) {
				return null;
			}
			return currentElement as HTMLElement;
		},
		[
			containerRef.current,
		],
	);

	/** Get page index for a selector (first match): page where that child starts. */
	const getPageIndexForSelector = useCallback(
		(selector: string): number | null => {
			const containerElement = containerRef.current;
			if (!containerElement) {
				return null;
			}
			const foundElement = containerElement.querySelector(selector);
			const childElement = toDirectChild(foundElement);
			if (!childElement) {
				return null;
			}

			const { pageSize } = readMetrics();
			const offset = isVertical
				? childElement.offsetTop
				: childElement.offsetLeft;
			const pageIndex = Math.floor(offset / pageSize);

			const pageCount = pageCountRef.current || computePageCount();
			if (pageIndex < 0) {
				return 0;
			}
			if (pageIndex > pageCount - 1) {
				return pageCount - 1;
			}
			return pageIndex;
		},
		[
			containerRef.current,
			toDirectChild,
			readMetrics,
			isVertical,
			computePageCount,
		],
	);

	// -- API --------------------------------------------------------------------

	/** Programmatic scroll to page (by index or selector). */
	const snapTo = useCallback(
		(
			target: useSnapperNav.SnapTarget,
			behavior: ScrollBehavior = "smooth",
		) => {
			const containerElement = containerRef.current;
			if (!containerElement) {
				return;
			}

			const pageCount = pageCountRef.current || computePageCount();

			let pageIndex: number | null = null;
			if (typeof target === "number") {
				pageIndex = target;
				if (pageIndex < 0) {
					pageIndex = 0;
				}
				if (pageIndex > pageCount - 1) {
					pageIndex = pageCount - 1;
				}
			} else {
				pageIndex = getPageIndexForSelector(target);
			}

			if (pageIndex == null) {
				// eslint-disable-next-line no-console
				console.warn(
					`useSnapperNav: selector not found or not inside container: "${String(target)}"`,
				);
				return;
			}

			const { pageSize, totalSize } = readMetrics();
			const maxScroll = Math.max(0, totalSize - pageSize);
			const targetPosition = Math.min(pageIndex * pageSize, maxScroll);

			if (isVertical) {
				containerElement.scrollTo({
					top: targetPosition,
					behavior,
				});
				return;
			}
			containerElement.scrollTo({
				left: targetPosition,
				behavior,
			});
		},
		[
			containerRef.current,
			isVertical,
			readMetrics,
			computePageCount,
			getPageIndexForSelector,
		],
	);

	const start = useCallback(() => {
		snapTo(0);
	}, [
		snapTo,
	]);

	const end = useCallback(() => {
		const last = Math.max(0, (pageCountRef.current || 1) - 1);
		snapTo(last);
	}, [
		snapTo,
	]);

	const next = useCallback(() => {
		snapTo(current + 1);
	}, [
		snapTo,
		current,
	]);

	const prev = useCallback(() => {
		snapTo(current - 1);
	}, [
		snapTo,
		current,
	]);

	// -- effects ----------------------------------------------------------------

	/** rAF-throttled scroll → derive `current`. */
	useEffect(() => {
		const containerElement = containerRef.current;
		if (!containerElement) {
			return;
		}

		let rafId = 0;
		const onScroll = () => {
			if (rafId) {
				return;
			}
			rafId = requestAnimationFrame(() => {
				rafId = 0;
				const { pageSize, position } = readMetrics();
				const pageCount = pageCountRef.current;
				const index = quantizeToPageIndex(
					position,
					pageSize,
					pageCount,
				);
				setCurrent((previous) =>
					previous === index ? previous : index,
				);
			});
		};

		containerElement.addEventListener("scroll", onScroll, {
			passive: true,
		});
		return () => {
			containerElement.removeEventListener("scroll", onScroll);
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};
	}, [
		containerRef.current,
		readMetrics,
		quantizeToPageIndex,
	]);

	/** Children changes → recompute pages; clamp/normalize. */
	useEffect(() => {
		const containerElement = containerRef.current;
		if (!containerElement) {
			recomputePageCount();
			return;
		}

		recomputePageCount();

		const mutationObserver = new MutationObserver(() => {
			const previousCount = pageCountRef.current;
			recomputePageCount();
			const nextCount = pageCountRef.current;

			if (nextCount === previousCount) {
				return;
			}

			const last = Math.max(0, nextCount - 1);
			if (current > last) {
				snapTo(last, "auto");
				return;
			}

			const { pageSize, position } = readMetrics();
			const index = quantizeToPageIndex(position, pageSize, nextCount);
			setCurrent((previous) => (previous === index ? previous : index));
		});

		mutationObserver.observe(containerElement, {
			childList: true,
			subtree: false,
		});
		return () => {
			mutationObserver.disconnect();
		};
	}, [
		containerRef.current,
		recomputePageCount,
		snapTo,
		current,
		readMetrics,
		quantizeToPageIndex,
	]);

	/** Resize → recompute and normalize (address bars, rotation, etc.). */
	useEffect(() => {
		const containerElement = containerRef.current;
		if (!containerElement) {
			return;
		}

		const resizeObserver = new ResizeObserver(() => {
			const oldCount = pageCountRef.current;
			recomputePageCount();
			const newCount = pageCountRef.current;

			const { pageSize, position } = readMetrics();
			const index = quantizeToPageIndex(position, pageSize, newCount);
			setCurrent((previous) => (previous === index ? previous : index));

			if (newCount < oldCount) {
				snapTo(index, "auto");
			}
		});

		resizeObserver.observe(containerElement);
		return () => {
			resizeObserver.disconnect();
		};
	}, [
		containerRef.current,
		recomputePageCount,
		readMetrics,
		quantizeToPageIndex,
		snapTo,
	]);

	/** Initial snap (no animation to avoid mount jank). */
	useEffect(() => {
		const containerElement = containerRef.current;
		if (!containerElement) {
			return;
		}
		recomputePageCount();
		const last = Math.max(0, pageCountRef.current - 1);
		const initial = Math.max(0, Math.min(last, defaultIndex));
		snapTo(initial, "auto");
	}, [
		containerRef.current,
		defaultIndex,
		recomputePageCount,
		snapTo,
	]);

	// -- result -----------------------------------------------------------------

	const count = Math.max(1, pageCountRef.current);

	return {
		current,
		count,
		isFirst: current === 0,
		isLast: current === count - 1,
		start,
		end,
		next,
		prev,
		snapTo,
	};
}
