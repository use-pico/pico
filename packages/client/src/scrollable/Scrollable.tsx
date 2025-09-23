import { type Cls, useCls, withCls } from "@use-pico/cls";
import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";
import { ScrollableCls } from "./ScrollableCls";

const clampToUnitInterval = (value: number) =>
	value < 0 ? 0 : value > 1 ? 1 : value;

export namespace Scrollable {
	export interface Props extends ScrollableCls.Props<PropsWithChildren> {
		layout: Cls.VariantOf<ScrollableCls, "layout">;
	}
}

export const BaseScrollable: FC<Scrollable.Props> = ({
	layout,
	cls = ScrollableCls,
	tweak,
	children,
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			layout,
		},
	});

	const fadePx = 32;
	const fadeSolid = 1;

	const rootElementRef = useRef<HTMLDivElement>(null);
	const viewportElementRef = useRef<HTMLDivElement>(null);
	const contentContainerRef = useRef<HTMLDivElement>(null);
	const topFadeElementRef = useRef<HTMLDivElement>(null);
	const bottomFadeElementRef = useRef<HTMLDivElement>(null);

	const updateFadeOpacity = useCallback(() => {
		const viewportEl = viewportElementRef.current;
		const topFadeEl = topFadeElementRef.current;
		const bottomFadeEl = bottomFadeElementRef.current;
		if (!viewportEl || !topFadeEl || !bottomFadeEl) return;

		const { scrollTop, scrollHeight, clientHeight } = viewportEl;
		const maxScrollable = Math.max(0, scrollHeight - clientHeight);

		if (maxScrollable <= 0) {
			topFadeEl.style.opacity = "0";
			bottomFadeEl.style.opacity = "0";
			return;
		}

		const topOpacity = clampToUnitInterval(scrollTop / fadePx);
		const bottomOpacity = clampToUnitInterval(
			(maxScrollable - scrollTop) / fadePx,
		);

		topFadeEl.style.opacity = topOpacity.toFixed(3);
		bottomFadeEl.style.opacity = bottomOpacity.toFixed(3);
	}, []);

	useLayoutEffect(() => {
		const rootEl = rootElementRef.current;
		const viewportEl = viewportElementRef.current;
		const topFadeEl = topFadeElementRef.current;
		const bottomFadeEl = bottomFadeElementRef.current;
		if (!rootEl || !viewportEl || !topFadeEl || !bottomFadeEl) return;

		topFadeEl.style.height = `${fadePx}px`;
		bottomFadeEl.style.height = `${fadePx}px`;

		rootEl.style.setProperty("--fade-solid", `${fadeSolid}px`);

		updateFadeOpacity(); // hned, bez transition
	}, [
		updateFadeOpacity,
	]);

	useEffect(() => {
		const viewportEl = viewportElementRef.current;
		const contentEl = contentContainerRef.current;
		if (!viewportEl) {
			return;
		}

		let rafId = 0;
		const onScroll = () => {
			if (!rafId) {
				rafId = requestAnimationFrame(() => {
					rafId = 0;
					updateFadeOpacity();
				});
			}
		};

		updateFadeOpacity();
		const firstFrameId = requestAnimationFrame(updateFadeOpacity);

		const resizeObserver = new ResizeObserver(() => updateFadeOpacity());
		resizeObserver.observe(viewportEl);
		if (contentEl) resizeObserver.observe(contentEl);

		viewportEl.addEventListener("scroll", onScroll, {
			passive: true,
		});

		return () => {
			viewportEl.removeEventListener("scroll", onScroll);
			resizeObserver.disconnect();
			cancelAnimationFrame(firstFrameId);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [
		updateFadeOpacity,
	]);

	return (
		<div
			ref={rootElementRef}
			data-ui="Scrollable-root"
			className={slots.root()}
		>
			<div
				ref={topFadeElementRef}
				aria-hidden={true}
				data-ui="Scrollable-fadeTop"
				className={slots.fadeTop()}
			/>
			<div
				ref={bottomFadeElementRef}
				aria-hidden={true}
				data-ui="Scrollable-fadeBottom"
				className={slots.fadeBottom()}
			/>

			<div
				ref={viewportElementRef}
				data-ui="Scrollable-viewport"
				className={slots.viewport()}
			>
				<div
					ref={contentContainerRef}
					data-ui="Scrollable-content"
					className={slots.content()}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export const Scrollable = withCls(BaseScrollable, ScrollableCls);
