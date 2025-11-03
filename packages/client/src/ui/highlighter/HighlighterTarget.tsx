import type { FC } from "react";
import { useEffect, useState } from "react";
import { Highlighter } from "./Highlighter";

export namespace HighlighterTarget {
	export interface Props extends Omit<Highlighter.Props, "rect"> {
		/** CSS selector to query the target element */
		selector: string | undefined;
	}
}

export const HighlighterTarget: FC<HighlighterTarget.Props> = ({
	selector,
	...props
}) => {
	const [rect, setRect] = useState<Highlighter.Rect | undefined>(undefined);

	useEffect(() => {
		if (!selector) {
			return;
		}

		const element = document.querySelector(selector);
		if (!element) {
			setRect(undefined);
			return;
		}

		const updateRect = () => {
			const elementRect = element.getBoundingClientRect();
			setRect({
				left: elementRect.left,
				top: elementRect.top,
				width: elementRect.width,
				height: elementRect.height,
			});
		};

		// Initial measurement
		updateRect();

		// Update on scroll/resize
		const handleUpdate = () => {
			updateRect();
		};

		window.addEventListener("scroll", handleUpdate, true);
		window.addEventListener("resize", handleUpdate);

		return () => {
			window.removeEventListener("scroll", handleUpdate, true);
			window.removeEventListener("resize", handleUpdate);
		};
	}, [
		selector,
	]);

	return (
		<Highlighter
			rect={rect}
			{...props}
		/>
	);
};
