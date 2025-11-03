import { clamp } from "@use-pico/common/clamp";
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
		containerRef: RefObject<HTMLElement | null>;
		orientation: "horizontal" | "vertical";
		count: number;
		defaultIndex?: number;
		threshold?: number;
		onSnapDebounce?: number;
		onSnap?: (index: number) => void;
	}

	export type SnapTarget = number | string;

	export interface State {
		current: number;
		count: number;
		isFirst: boolean;
		isLast: boolean;
	}

	export interface Api {
		start: () => void;
		end: () => void;
		next: () => void;
		prev: () => void;
		snapTo: (target: SnapTarget, behavior?: ScrollBehavior) => void;
	}

	export interface Result {
		state: State;
		api: Api;
	}
}

export function useSnapperNav({
	containerRef,
	orientation,
	count,
	defaultIndex = 0,
	threshold = 0.5,
	onSnapDebounce = 150,
	onSnap,
}: useSnapperNav.Props): useSnapperNav.Result {
	const totalCount = Math.max(1, Math.floor(count));
	const isVertical = orientation === "vertical";
	const clampedThreshold = clamp(threshold, 0, 1);

	const [current, setCurrent] = useState(() =>
		clamp(defaultIndex, 0, totalCount - 1),
	);
	const currentRef = useRef(current);
	currentRef.current = current;

	const emitSnap = useEffectEvent((index: number) => {
		onSnap?.(index);
	});

	const emitSnapDebounced = useDebouncedCallback(
		(index: number) => emitSnap(index),
		onSnapDebounce,
		{
			maxWait: onSnapDebounce,
			trailing: true,
		},
	);

	useEffect(
		() => () => emitSnapDebounced.cancel(),
		[
			emitSnapDebounced,
		],
	);

	// --- helpers ---------------------------------------------------------------

	const getChildSize = useCallback(
		(element: HTMLElement) =>
			Math.max(
				1,
				isVertical ? element.clientHeight : element.clientWidth,
			),
		[
			isVertical,
		],
	);

	const getChildOffset = useCallback(
		(element: HTMLElement) =>
			isVertical ? element.offsetTop : element.offsetLeft,
		[
			isVertical,
		],
	);

	/**
	 * Read scroll metrics. Page size (stride) is:
	 *   - offset(second) - offset(first), if both exist and stride > 0
	 *   - else size(first), if first exists
	 *   - else container client size
	 */
	const readMetrics = useCallback(() => {
		const host = containerRef.current;
		if (!host)
			return {
				pageSize: 1,
				position: 0,
				totalSize: 1,
			};

		const position = isVertical ? host.scrollTop : host.scrollLeft;
		const totalSize = Math.max(
			1,
			isVertical ? host.scrollHeight : host.scrollWidth,
		);
		const clientSize = Math.max(
			1,
			isVertical ? host.clientHeight : host.clientWidth,
		);

		let pageSize = clientSize;

		const children = host.children as HTMLCollectionOf<HTMLElement>;
		const first = children.item(0);
		const second = children.item(1);

		const firstSize = first ? getChildSize(first) : clientSize;
		const stride =
			first && second
				? getChildOffset(second) - getChildOffset(first)
				: 0;

		pageSize = Math.max(1, stride > 0 ? stride : firstSize);

		return {
			pageSize,
			position,
			totalSize,
		};
	}, [
		containerRef,
		isVertical,
		getChildOffset,
		getChildSize,
	]);

	const positionToIndex = useCallback(
		(position: number, pageSize: number, total: number) => {
			const raw = (position + pageSize * clampedThreshold) / pageSize;
			return clamp(Math.floor(raw), 0, Math.max(0, total - 1));
		},
		[
			clampedThreshold,
		],
	);

	const toDirectChild = useCallback(
		(node: Element | null): HTMLElement | null => {
			const host = containerRef.current;
			if (!host || !node) return null;
			let cursor: Element | null = node;
			while (cursor && cursor.parentElement !== host)
				cursor = cursor.parentElement;
			if (!cursor || cursor.parentElement !== host) return null;
			return cursor as HTMLElement;
		},
		[
			containerRef,
		],
	);

	// --- navigation API --------------------------------------------------------

	const snapTo = useCallback(
		(
			target: useSnapperNav.SnapTarget,
			behavior: ScrollBehavior = "smooth",
		) => {
			const host = containerRef.current;
			if (!host) return;

			let pageIndex: number;
			if (typeof target === "number") {
				pageIndex = clamp(Math.floor(target), 0, totalCount - 1);
			} else {
				const found = host.querySelector(target);
				const directChild = toDirectChild(found);
				if (!directChild) return;

				const { pageSize } = readMetrics();
				const raw =
					(isVertical
						? directChild.offsetTop
						: directChild.offsetLeft) / pageSize;
				pageIndex = clamp(Math.round(raw), 0, totalCount - 1);
			}

			const { pageSize, totalSize, position } = readMetrics();
			const maxScroll = Math.max(0, totalSize - pageSize);
			const targetPixels = clamp(pageIndex * pageSize, 0, maxScroll);

			const EPSILON = 2;
			if (Math.abs(position - targetPixels) <= EPSILON) return;

			if (isVertical)
				host.scrollTo({
					top: targetPixels,
					behavior,
				});
			else
				host.scrollTo({
					left: targetPixels,
					behavior,
				});
		},
		[
			containerRef,
			isVertical,
			totalCount,
			readMetrics,
			toDirectChild,
		],
	);

	const start = useCallback(
		() => snapTo(0),
		[
			snapTo,
		],
	);
	const end = useCallback(
		() => snapTo(totalCount - 1),
		[
			snapTo,
			totalCount,
		],
	);
	const next = useCallback(
		() => snapTo(currentRef.current + 1),
		[
			snapTo,
		],
	);
	const prev = useCallback(
		() => snapTo(currentRef.current - 1),
		[
			snapTo,
		],
	);

	// --- lifecycle -------------------------------------------------------------

	useLayoutEffect(() => {
		const host = containerRef.current;
		if (!host) return;

		const initialIndex = clamp(defaultIndex, 0, totalCount - 1);
		const { pageSize, totalSize } = readMetrics();
		const maxScroll = Math.max(0, totalSize - pageSize);
		const targetPixels = clamp(initialIndex * pageSize, 0, maxScroll);

		if (isVertical)
			host.scrollTo({
				top: targetPixels,
				behavior: "auto",
			});
		else
			host.scrollTo({
				left: targetPixels,
				behavior: "auto",
			});

		currentRef.current = initialIndex;
		setCurrent(initialIndex);

		const { position } = readMetrics();
		const derivedIndex = positionToIndex(position, pageSize, totalCount);
		if (derivedIndex !== initialIndex) {
			currentRef.current = derivedIndex;
			setCurrent(derivedIndex);
		}
	}, [
		containerRef,
		defaultIndex,
		totalCount,
		isVertical,
		readMetrics,
		positionToIndex,
	]);

	useEffect(() => {
		const host = containerRef.current;
		if (!host) return;

		function handleScroll() {
			const { pageSize, position } = readMetrics();
			const newIndex = positionToIndex(position, pageSize, totalCount);
			if (newIndex !== currentRef.current) {
				currentRef.current = newIndex;
				setCurrent(newIndex);
				emitSnapDebounced(newIndex);
			}
		}

		host.addEventListener("scroll", handleScroll, {
			passive: true,
		});
		return () => host.removeEventListener("scroll", handleScroll);
	}, [
		containerRef,
		totalCount,
		readMetrics,
		positionToIndex,
		emitSnapDebounced,
	]);

	useEffect(() => {
		const clampedIndex = clamp(currentRef.current, 0, totalCount - 1);
		if (clampedIndex !== currentRef.current) {
			currentRef.current = clampedIndex;
			setCurrent(clampedIndex);
			emitSnapDebounced(clampedIndex);
		}
	}, [
		totalCount,
		emitSnapDebounced,
	]);

	// --- result ---------------------------------------------------------------

	const state = useMemo<useSnapperNav.State>(
		() => ({
			current,
			count: totalCount,
			isFirst: current === 0,
			isLast: current === Math.max(0, totalCount - 1),
		}),
		[
			current,
			totalCount,
		],
	);

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
