import { type RefObject, useCallback } from "react";

export namespace useScrollTo {
	export type Axis = "y" | "x" | "both";

	export interface Options {
		/** If multiple elements match, which one to pick (default 0) */
		index?: number;
		/** Smooth vs. instant (default "smooth") */
		behavior?: ScrollBehavior;
		/** Axis to scroll (default "y") */
		axis?: Axis;
		/** Extra px offset added towards the scroll direction(s) */
		offset?: number;
	}
}

/**
 * Tiny hook to scroll a descendant (by CSS selector) into the center of a scroll container.
 * Requires a scrollable container ref.
 */
export function useScrollTo(containerRef: RefObject<HTMLElement | null>) {
	const scrollTo = useCallback(
		(selector: string, opts: useScrollTo.Options = {}) => {
			const {
				index = 0,
				behavior = "smooth",
				axis = "y",
				offset = 0,
			} = opts;

			const container = containerRef.current;
			if (!container || !selector) {
				return;
			}

			// Query inside the container only
			const nodes = container.querySelectorAll<HTMLElement>(selector);
			const target = nodes.item(index);
			if (!target) {
				return;
			}

			const viewportW = container.clientWidth;
			const viewportH = container.clientHeight;

			const cRect = container.getBoundingClientRect();
			const tRect = target.getBoundingClientRect();

			// Position of target relative to container's scroll origin
			const targetLeftAbs =
				container.scrollLeft + (tRect.left - cRect.left);
			const targetTopAbs = container.scrollTop + (tRect.top - cRect.top);

			// Desired center positions
			let left = targetLeftAbs + tRect.width / 2 - viewportW / 2;
			let top = targetTopAbs + tRect.height / 2 - viewportH / 2;

			// Apply optional offset per axis
			if (axis !== "y") {
				left += offset;
			}
			if (axis !== "x") {
				top += offset;
			}

			// Clamp to container bounds
			const maxLeft = Math.max(0, container.scrollWidth - viewportW);
			const maxTop = Math.max(0, container.scrollHeight - viewportH);

			if (axis === "x" || axis === "both") {
				left = Math.min(Math.max(0, left), maxLeft);
			} else {
				left = container.scrollLeft; // keep X
			}

			if (axis === "y" || axis === "both") {
				top = Math.min(Math.max(0, top), maxTop);
			} else {
				top = container.scrollTop; // keep Y
			}

			container.scrollTo({
				left,
				top,
				behavior,
			});
		},
		[
			containerRef,
		],
	);

	return scrollTo;
}
