import type { RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export namespace useSentinel {
	export interface Props {
		containerRef: RefObject<HTMLElement | null>;
		threshold?: number | number[];
		onEnter?(): void;
		onLeave?(): void;
	}

	export interface Result<TElement extends HTMLElement | null> {
		sentinelRef: RefObject<TElement>;
		inView: boolean;
	}
}

export function useSentinel<TElement extends HTMLElement | null>({
	containerRef,
	threshold = 1,
	onEnter,
	onLeave,
}: useSentinel.Props): useSentinel.Result<TElement> {
	const [inView, setInView] = useState(false);

	const sentinelElRef = useRef<TElement>(null);
	const ioRef = useRef<IntersectionObserver | null>(null);
	const lastRef = useRef<boolean | null>(null);
	const latestRef = useRef({
		threshold,
		onEnter,
		onLeave,
	});
	latestRef.current.threshold = threshold;
	latestRef.current.onEnter = onEnter;
	latestRef.current.onLeave = onLeave;

	const disconnect = () => {
		if (!ioRef.current) return;
		ioRef.current.disconnect();
		ioRef.current = null;
		lastRef.current = null;
	};

	const connect = (root: HTMLElement, sentinel: HTMLElement) => {
		disconnect();

		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry) return;

				const next = entry.isIntersecting;
				if (lastRef.current === next) return;

				lastRef.current = next;
				setInView(next);

				if (next) {
					latestRef.current.onEnter?.();
					return;
				}

				latestRef.current.onLeave?.();
			},
			{
				root,
				threshold: latestRef.current.threshold,
			},
		);

		io.observe(sentinel);
		ioRef.current = io;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: Ssst
	const sentinelRef = useMemo<RefObject<TElement>>(() => {
		const obj: any = {};

		Object.defineProperty(obj, "current", {
			enumerable: true,
			get() {
				return sentinelElRef.current;
			},
			set(next: HTMLElement | null) {
				if (sentinelElRef.current === next) {
					return;
				}

				sentinelElRef.current = next as TElement;

				if (!next) {
					disconnect();
					setInView(false);
					return;
				}

				const root = containerRef.current;
				if (!root) {
					return;
				}

				connect(root, next);
			},
		});

		return obj;
	}, []);

	// cleanup on unmount
	// biome-ignore lint/correctness/useExhaustiveDependencies: We're OK
	useEffect(() => {
		return () => {
			disconnect();
			sentinelElRef.current = null;
		};
	}, []);

	return {
		sentinelRef,
		inView,
	};
}
