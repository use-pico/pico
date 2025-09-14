import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

/** Tracks an element and returns its viewport rect; updates are batched with rAF. */
export function useHighlightRectangle(selector: string | undefined) {
	const [targetElement, setTargetElement] = useState<HTMLElement | null>(
		null,
	);
	const [boundingRectangle, setBoundingRectangle] = useState<
		DOMRect | undefined
	>();

	useLayoutEffect(() => {
		if (!selector) {
			setTargetElement(null);
			setBoundingRectangle(undefined);
			return;
		}

		const el = document.querySelector(selector) as HTMLElement | null;
		setTargetElement(el);
		setBoundingRectangle(el?.getBoundingClientRect());
	}, [
		selector,
	]);

	const rafIdRef = useRef<number | null>(null);
	const schedule = useCallback((fn: () => void) => {
		if (rafIdRef.current != null) {
			return;
		}
		rafIdRef.current = requestAnimationFrame(() => {
			rafIdRef.current = null;
			fn();
		});
	}, []);

	useEffect(() => {
		if (!targetElement) {
			return;
		}

		const update = () => {
			setBoundingRectangle(targetElement.getBoundingClientRect());
		};
		const scheduleUpdate = () => {
			schedule(update);
		};

		scheduleUpdate();

		const resizeObserver = new ResizeObserver(scheduleUpdate);
		resizeObserver.observe(targetElement);

		const mutationObserver = new MutationObserver(scheduleUpdate);
		mutationObserver.observe(document.documentElement, {
			attributes: true,
			childList: true,
			subtree: true,
		});

		window.addEventListener("resize", scheduleUpdate, {
			passive: true,
		});
		window.addEventListener("scroll", scheduleUpdate, {
			passive: true,
		});

		const visualViewport = window.visualViewport;
		visualViewport?.addEventListener("resize", scheduleUpdate);
		visualViewport?.addEventListener("scroll", scheduleUpdate);

		return () => {
			if (rafIdRef.current != null) {
				cancelAnimationFrame(rafIdRef.current);
			}
			resizeObserver.disconnect();
			mutationObserver.disconnect();
			window.removeEventListener("resize", scheduleUpdate);
			window.removeEventListener("scroll", scheduleUpdate);
			visualViewport?.removeEventListener("resize", scheduleUpdate);
			visualViewport?.removeEventListener("scroll", scheduleUpdate);
		};
	}, [
		schedule,
		targetElement,
	]);

	return {
		targetElement,
		boundingRectangle,
	};
}
