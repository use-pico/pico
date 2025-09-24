import { useCls, withCls } from "@use-pico/cls";
import {
	type FC,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";
import { FadeCls } from "./FadeCls";

const clampToUnitInterval = (value: number) =>
	value < 0 ? 0 : value > 1 ? 1 : value;

export namespace Fade {
	export interface Props extends FadeCls.Props {
		scrollableRef: React.RefObject<HTMLElement | null>;
		height?: number;
		fade?: number;
	}
}

export const BaseFade: FC<Fade.Props> = ({
	height = 64,
	fade = height * 2,
	cls = FadeCls,
	tweak,
	scrollableRef,
}) => {
	const { slots } = useCls(cls, tweak);

	const topFadeElementRef = useRef<HTMLDivElement>(null);
	const bottomFadeElementRef = useRef<HTMLDivElement>(null);

	const updateFadeOpacity = useCallback(() => {
		const scrollableEl = scrollableRef.current;
		const topFadeEl = topFadeElementRef.current;
		const bottomFadeEl = bottomFadeElementRef.current;
		if (!scrollableEl || !topFadeEl || !bottomFadeEl) {
			return;
		}

		const { scrollTop, scrollHeight, clientHeight } = scrollableEl;
		const maxScrollable = Math.max(0, scrollHeight - clientHeight);

		if (maxScrollable <= 0) {
			topFadeEl.style.opacity = "0";
			bottomFadeEl.style.opacity = "0";
			return;
		}

		const topOpacity = clampToUnitInterval(scrollTop / fade);
		const bottomOpacity = clampToUnitInterval(
			(maxScrollable - scrollTop) / fade,
		);

		topFadeEl.style.opacity = topOpacity.toFixed(3);
		bottomFadeEl.style.opacity = bottomOpacity.toFixed(3);
	}, [
		scrollableRef,
		fade,
	]);

	useLayoutEffect(() => {
		const topFadeEl = topFadeElementRef.current;
		const bottomFadeEl = bottomFadeElementRef.current;
		if (!topFadeEl || !bottomFadeEl) {
			return;
		}

		topFadeEl.style.height = `${height}px`;
		bottomFadeEl.style.height = `${height}px`;

		updateFadeOpacity(); // immediately, without transition
	}, [
		updateFadeOpacity,
		height,
	]);

	useEffect(() => {
		const scrollableEl = scrollableRef.current;
		if (!scrollableEl) {
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
		resizeObserver.observe(scrollableEl);

		scrollableEl.addEventListener("scroll", onScroll, {
			passive: true,
		});

		return () => {
			scrollableEl.removeEventListener("scroll", onScroll);
			resizeObserver.disconnect();
			cancelAnimationFrame(firstFrameId);
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};
	}, [
		scrollableRef,
		updateFadeOpacity,
	]);

	return (
		<>
			<div
				ref={topFadeElementRef}
				aria-hidden={true}
				data-ui="Fade-top"
				className={slots.top()}
			/>
			<div
				ref={bottomFadeElementRef}
				aria-hidden={true}
				data-ui="Fade-bottom"
				className={slots.bottom()}
			/>
		</>
	);
};

export const Fade = withCls(BaseFade, FadeCls);
