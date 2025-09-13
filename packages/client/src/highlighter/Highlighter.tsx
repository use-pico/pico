import { useCls, withCls } from "@use-pico/cls";
import { AnimatePresence, motion } from "motion/react";
import type { FC } from "react";
import { HighlighterCls } from "./HighlighterCls";

export namespace Highlighter {
	export type Rect = Pick<DOMRect, "left" | "top" | "width" | "height">;

	export interface Props extends HighlighterCls.Props {
		/**
		 * Whether the highlighter is visible .
		 *
		 * Highlighter is animated - do not remove it from the DOM or exit animation
		 * will not work properly. The whole component is lightweight, so you may not bother
		 * to keep it present.
		 */
		visible: boolean;
		/** Viewport-relative rectangle of the target element */
		rect: Rect | undefined;
		/** Extra padding expanded around the rectangle */
		padding?: number;
		/** Called when user clicks the backdrop (including the hole; hole is not click-through) */
		onBackdropClick?: () => void;
	}
}

export const BaseHighlighter: FC<Highlighter.Props> = ({
	visible,
	rect,
	padding = 8,
	onBackdropClick,
	cls = HighlighterCls,
	tweak,
}) => {
	const slots = useCls(cls, tweak);

	if (!rect) {
		return null;
	}

	const x = Math.max(0, Math.floor(rect.left - padding));
	const y = Math.max(0, Math.floor(rect.top - padding));
	const width = Math.ceil(rect.width + padding * 2);
	const height = Math.ceil(rect.height + padding * 2);

	return (
		<AnimatePresence>
			{visible ? (
				<motion.div
					className={slots.root()}
					onClick={onBackdropClick}
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
					transition={{
						duration: 0.2,
						ease: "easeOut",
					}}
				>
					<motion.div
						className={slots.hole()}
						style={{
							top: y,
							left: x,
							width,
							height,
						}}
						initial={{
							scale: 1.2,
							opacity: 0,
						}}
						animate={{
							scale: 1,
							opacity: 1,
						}}
						exit={{
							scale: 1.2,
							opacity: 0,
						}}
						transition={{
							duration: 0.3,
							ease: "easeOut",
							delay: 0.1,
						}}
					/>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};

export const Highlighter = withCls(BaseHighlighter, HighlighterCls);
