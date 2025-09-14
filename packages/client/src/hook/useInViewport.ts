import { useEffect, useState } from "react";

export namespace useInViewport {
	export interface Props {
		threshold?: number;
		rootMargin?: string;
	}
}

/** Reports whether the element is in viewport using IntersectionObserver. */
export function useInViewport(
	element: HTMLElement | null,
	{ threshold = 1, rootMargin = "0px" }: useInViewport.Props = {},
) {
	const [inView, setInView] = useState(false);

	useEffect(() => {
		if (!element) {
			setInView(false);
			return;
		}
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				const entry =
					entries.find((e) => e.target === element) ?? entries[0];

				setInView(
					Boolean(
						entry?.isIntersecting &&
							entry.intersectionRatio >= threshold,
					),
				);
			},
			{
				root: null,
				rootMargin,
				threshold,
			},
		);
		intersectionObserver.observe(element);
		return () => {
			intersectionObserver.disconnect();
		};
	}, [
		element,
		threshold,
		rootMargin,
	]);

	return inView;
}
