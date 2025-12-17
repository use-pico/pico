import { type FC, type RefObject, useCallback, useEffect, useRef } from "react";
import { uiFade } from "./uiFade";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export namespace Fade {
	export interface Props extends uiFade.Component {
		scrollableRef: RefObject<HTMLElement | null>;
		height?: number;
		fade?: number;
	}
}

export const Fade: FC<Fade.Props> = ({
	height = 10,
	fade = height * 2,
	scrollableRef,
	//
	ui,
	className,
}) => {
	const topFadeRef = useRef<HTMLDivElement>(null);
	const bottomFadeRef = useRef<HTMLDivElement>(null);

	const rafIdRef = useRef<number | 0>(0);
	const schedule = useCallback((fn: () => void) => {
		if (rafIdRef.current) {
			return;
		}
		rafIdRef.current = requestAnimationFrame(() => {
			rafIdRef.current = 0;
			fn();
		});
	}, []);

	const update = useCallback(() => {
		const scrollable = scrollableRef.current;
		const top = topFadeRef.current;
		const bottom = bottomFadeRef.current;
		if (!scrollable || !top || !bottom) {
			return;
		}

		const { scrollTop, scrollHeight, clientHeight } = scrollable;
		const maxScrollable = Math.max(0, scrollHeight - clientHeight);

		if (maxScrollable <= 0) {
			top.style.opacity = "0";
			bottom.style.opacity = "0";
			return;
		}

		const topOpacity = clamp01(scrollTop / fade);
		const bottomOpacity = clamp01((maxScrollable - scrollTop) / fade);

		top.style.opacity = topOpacity.toFixed(3);
		bottom.style.opacity = bottomOpacity.toFixed(3);
	}, [
		scrollableRef,
		fade,
	]);

	useEffect(() => {
		const scrollable = scrollableRef.current;
		if (!scrollable) {
			return;
		}

		const onScroll = () => schedule(update);
		scrollable.addEventListener("scroll", onScroll, {
			passive: true,
		});

		const resizeObserver = new ResizeObserver(() => schedule(update));
		resizeObserver.observe(scrollable);

		const mutationObserver = new MutationObserver(() => schedule(update));
		mutationObserver.observe(scrollable, {
			childList: true,
			subtree: true,
			attributes: false,
		});

		update();
		const initId = requestAnimationFrame(update);

		return () => {
			scrollable.removeEventListener("scroll", onScroll);
			resizeObserver.disconnect();
			mutationObserver.disconnect();
			cancelAnimationFrame(initId);
			if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = 0;
		};
	}, [
		scrollableRef,
		schedule,
		update,
	]);

	return (
		<>
			<div
				ref={topFadeRef}
				aria-hidden
				{...uiFade({
					ui,
					className,
				})}
				data-ui="Fade-top"
				style={{
					height,
				}}
			/>

			<div
				ref={bottomFadeRef}
				aria-hidden
				{...uiFade({
					ui,
					className,
				})}
				data-ui="Fade-bottom"
				style={{
					height,
				}}
			/>
		</>
	);
};
