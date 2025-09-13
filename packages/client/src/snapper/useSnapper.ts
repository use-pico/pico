import { useCallback, useContext } from "react";
import { SnapperCtx } from "./SnapperCtx";

export const useSnapper = () => {
	const ctx = useContext(SnapperCtx);
	if (!ctx) {
		throw new Error("useSnapper must be used inside <Snapper />");
	}

	const { orientation, containerRef } = ctx;

	const scrollToIndex = useCallback(
		(index: number, behavior: ScrollBehavior = "smooth") => {
			const el = containerRef.current;
			if (!el) {
				return;
			}

			const track = el.firstElementChild as HTMLElement | null;
			if (!track) {
				return;
			}

			const item = track.children[index] as HTMLElement | null;
			if (!item) {
				return;
			}

			if (orientation === "vertical") {
				el.scrollTo({
					top: item.offsetTop,
					behavior,
				});
			} else {
				el.scrollTo({
					left: item.offsetLeft,
					behavior,
				});
			}
		},
		[
			containerRef,
			orientation,
		],
	);

	return {
		orientation,
		containerRef,
		scrollToIndex,
	};
};
