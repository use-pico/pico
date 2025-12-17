import ScrollTrigger from "gsap/ScrollTrigger";
import { type RefObject, useEffect, useState } from "react";
import { useAnim } from "../gsap/gsap";

export namespace useElementVisibility {
	export interface Visibility extends ScrollTrigger.StaticVars {
		setVisible(visible: boolean): void;
	}

	export interface Proximity extends ScrollTrigger.StaticVars {
		overscan?: number;
		setTop?(proximity: boolean): void;
		setBottom?(proximity: boolean): void;
	}

	/**
	 * Configuration object for `useElementVisibility`.
	 */
	export interface Props {
		/**
		 * Element that ScrollTrigger observes for scroll position context.
		 */
		scrollerRef: RefObject<HTMLElement | null>;
		/**
		 * Element whose visibility within the scroller bounds is tracked.
		 */
		triggerRef: RefObject<HTMLElement | null>;
		visibility?: Visibility;
		proximity?: Proximity;
	}
}

/**
 * Establishes a ScrollTrigger instance that toggles visibility state while a trigger element
 * enters or leaves the viewport of the provided scroller.
 *
 * @param props - Hook configuration.
 */
export function useElementVisibility({
	scrollerRef,
	triggerRef,
	visibility,
	proximity,
}: useElementVisibility.Props) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (!scrollerRef.current || !triggerRef.current) {
			return;
		}
		setReady(true);
	}, [
		scrollerRef,
		triggerRef,
	]);

	useAnim(
		() => {
			if (!scrollerRef.current || !triggerRef.current) {
				return;
			}

			if (visibility) {
				const {
					setVisible,
					onEnter,
					onEnterBack,
					onLeave,
					onLeaveBack,
					start = "top bottom",
					end = "bottom top",
					...visibleProps
				} = visibility;

				ScrollTrigger.create({
					trigger: triggerRef.current,
					scroller: scrollerRef.current,
					start,
					end,
					...visibleProps,
					onEnter(props) {
						setVisible(true);
						onEnter?.(props);
					},
					onEnterBack(props) {
						setVisible(true);
						onEnterBack?.(props);
					},
					onLeave(props) {
						setVisible(false);
						onLeave?.(props);
					},
					onLeaveBack(props) {
						setVisible(false);
						onLeaveBack?.(props);
					},
				});
			}

			if (proximity) {
				const {
					overscan = 2,
					setTop,
					setBottom,
					onEnter,
					onEnterBack,
					onLeave,
					onLeaveBack,
					...proximityProps
				} = proximity;

				if (setTop) {
					/**
					 * Top proximity trigger
					 */
					ScrollTrigger.create({
						trigger: triggerRef.current,
						scroller: scrollerRef.current,
						start: "top+=100% bottom",
						end: `bottom+=${overscan * 100}% top`,
						...proximityProps,
						onEnter(props) {
							setTop(true);
							onEnter?.(props);
						},
						onEnterBack(props) {
							setTop(true);
							onEnterBack?.(props);
						},
						onLeave(props) {
							setTop(false);
							onLeave?.(props);
						},
						onLeaveBack(props) {
							setTop(false);
							onLeaveBack?.(props);
						},
					});
				}

				/**
				 * Bottom proximity trigger
				 */
				if (setBottom) {
					ScrollTrigger.create({
						trigger: triggerRef.current,
						scroller: scrollerRef.current,
						start: `top-=${overscan * 100}% bottom`,
						end: "bottom-=100% top",
						...proximityProps,
						onEnter(props) {
							setBottom(true);
							onEnter?.(props);
						},
						onEnterBack(props) {
							setBottom(true);
							onEnterBack?.(props);
						},
						onLeave(props) {
							setBottom(false);
							onLeave?.(props);
						},
						onLeaveBack(props) {
							setBottom(false);
							onLeaveBack?.(props);
						},
					});
				}
			}
		},
		{
			scope: scrollerRef.current ?? undefined,
			dependencies: [
				ready,
			],
		},
	);
}
