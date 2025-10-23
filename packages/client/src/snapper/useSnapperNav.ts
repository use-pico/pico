import { clamp } from "@use-pico/common";
import {
	type RefObject,
	useCallback,
	useEffect,
	useEffectEvent,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";

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
		 * Debounce delay in milliseconds for onSnap callback.
		 */
		onSnapDebounce?: number;
		/**
		 * Called when a new page index is derived (debounced).
		 */
		onSnap?: (index: number) => void;
	}

	/**
	 * Page index or a CSS selector scoped to the container.
	 */
	export type SnapTarget = number | string;

	/**
	 * Read-only state the consumers can subscribe to.
	 */
	export interface State {
		current: number;
		count: number;
		isFirst: boolean;
		isLast: boolean;
	}

	/**
	 * Stable action API used to drive navigation.
	 */
	export interface Api {
		start: () => void;
		end: () => void;
		next: () => void;
		prev: () => void;
		snapTo: (target: SnapTarget, behavior?: ScrollBehavior) => void;
	}

	/**
	 * Hook result: split into { state, api } to minimize re-renders in consumers.
	 */
	export interface Result {
		state: State;
		api: Api;
	}
}

/**
 * Minimal page snap navigator (count-driven, SSR-friendly).
 * A "page" equals the container viewport (clientWidth/Height).
 */
export function useSnapperNav({
	containerRef,
	orientation,
	count,
	defaultIndex = 0,
	threshold = 0.5,
	onSnapDebounce = 150,
	onSnap,
}: useSnapperNav.Props): useSnapperNav.Result {
	const $count = Math.max(1, Math.floor(count));
	const isVertical = orientation === "vertical";
	const $threshold = clamp(threshold, 0, 1);

	/**
	 * Local state + live ref so handlers always see the latest index.
	 */
	const [current, setCurrent] = useState(() => {
		const last = $count - 1;
		return clamp(defaultIndex, 0, last);
	});
	const currentRef = useRef(current);
	currentRef.current = current;

	/**
	 * Always-latest emitter for onSnap (reads newest props/state).
	 * We call this ONLY from the debounced wrapper below.
	 */
	const emitSnap = useEffectEvent((idx: number) => {
		onSnap?.(idx);
	});

	/**
	 * Debounced onSnap. Adjust delay as needed.
	 * Used from the scroll listener and from count-clamp effect.
	 */
	const emitSnapDebounced = useDebouncedCallback(
		(idx: number) => {
			emitSnap(idx);
		},
		onSnapDebounce,
		{
			maxWait: onSnapDebounce,
			trailing: true,
		},
	);

	/**
	 * Cancel any pending debounced emits on unmount.
	 */
	useEffect(() => {
		return () => {
			emitSnapDebounced.cancel();
		};
	}, [
		emitSnapDebounced,
	]);

	/**
	 * Read container metrics (page size, current scroll position, content size).
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
	 * Convert pixel position to page index using threshold.
	 */
	const toIndex = useCallback(
		(position: number, size: number, count: number) => {
			const raw = (position + size * $threshold) / size;
			return clamp(Math.floor(raw), 0, Math.max(0, count - 1));
		},
		[
			$threshold,
		],
	);

	/**
	 * Lift any descendant node to the nearest direct child of the container.
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
	 * Does NOT emit onSnap; the scroll listener derives index and emits (debounced).
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

			let pageIndex: number;

			if (typeof target === "number") {
				pageIndex = clamp(Math.floor(target), 0, $count - 1);
			} else {
				const found = host.querySelector(target);
				const child = toDirectChild(found);

				if (!child) {
					return;
				}

				const { pageSize } = metrics();
				const offset = isVertical ? child.offsetTop : child.offsetLeft;
				pageIndex = clamp(Math.floor(offset / pageSize), 0, $count - 1);
			}

			const { pageSize, totalSize, position } = metrics();
			const maxScroll = Math.max(0, totalSize - pageSize);
			const targetPx = clamp(pageIndex * pageSize, 0, maxScroll);

			const EPS = 1;
			if (Math.abs(position - targetPx) <= EPS) {
				return;
			}

			if (isVertical) {
				host.scrollTo({
					top: targetPx,
					behavior,
				});
			} else {
				host.scrollTo({
					left: targetPx,
					behavior,
				});
			}
		},
		[
			containerRef,
			isVertical,
			$count,
			metrics,
			toDirectChild,
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
	 * Initial mount: set initial scroll position (no emits, no listener yet).
	 * Also derives `current` from metrics as a backup in case no scroll event fires.
	 */
	useLayoutEffect(() => {
		const host = containerRef.current;

		if (!host) {
			return;
		}

		const initial = clamp(defaultIndex, 0, $count - 1);
		const pageSize = isVertical ? host.clientHeight : host.clientWidth;
		const totalSize = isVertical ? host.scrollHeight : host.scrollWidth;
		const maxScroll = Math.max(0, totalSize - pageSize);
		const targetPx = clamp(initial * pageSize, 0, maxScroll);

		if (isVertical) {
			host.scrollTo({
				top: targetPx,
				behavior: "auto",
			});
		} else {
			host.scrollTo({
				left: targetPx,
				behavior: "auto",
			});
		}

		currentRef.current = initial;
		setCurrent(initial);

		const { position } = metrics();
		const idx = toIndex(position, pageSize, $count);

		if (idx !== initial) {
			currentRef.current = idx;
			setCurrent(idx);
			// onSnap is debounced and only called from the scroll listener
		}
	}, [
		containerRef,
		defaultIndex,
		$count,
		isVertical,
		metrics,
		toIndex,
	]);

	/**
	 * Scroll listener: sole source of truth for `current` and debounced onSnap.
	 */
	useEffect(() => {
		const host = containerRef.current;

		if (!host) {
			return;
		}

		function onScroll() {
			const { pageSize, position } = metrics();
			const idx = toIndex(position, pageSize, $count);

			if (idx !== currentRef.current) {
				currentRef.current = idx;
				setCurrent(idx);
				emitSnapDebounced(idx);
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
		toIndex,
		emitSnapDebounced,
	]);

	/**
	 * Count changes: clamp current to the new range.
	 * If it changed, notify via debounced onSnap.
	 * No automatic scroll here; keep UI steady unless caller decides otherwise.
	 */
	useEffect(() => {
		const clamped = clamp(currentRef.current, 0, $count - 1);

		if (clamped !== currentRef.current) {
			currentRef.current = clamped;
			setCurrent(clamped);
			emitSnapDebounced(clamped);
		}
	}, [
		$count,
		emitSnapDebounced,
	]);

	/**
	 * Compose { state, api }.
	 * - `api` is memoized so action identity is stable across renders.
	 * - `state` changes when data changes (as intended).
	 */
	const state = useMemo<useSnapperNav.State>(() => {
		return {
			current,
			count: $count,
			isFirst: current === 0,
			isLast: current === Math.max(0, $count - 1),
		};
	}, [
		current,
		$count,
	]);

	const api = useMemo<useSnapperNav.Api>(
		() => ({
			start,
			end,
			next,
			prev,
			snapTo,
		}),
		[
			start,
			end,
			next,
			prev,
			snapTo,
		],
	);

	return {
		state,
		api,
	};
}
