import { useCls, withCls } from "@use-pico/cls";
import { AnimatePresence, motion } from "motion/react";
import type { FC } from "react";
import { HighlighterCls } from "./HighlighterCls";

export namespace Highlighter {
	export type Rect = Pick<DOMRect, "left" | "top" | "width" | "height">;

	export interface Props extends HighlighterCls.Props {
		visible: boolean;
		rect: Rect | undefined;
		padding?: number;
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
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			center: rect === undefined,
		}),
	}));

	return (
		<AnimatePresence>
			{visible ? (
				<motion.div
					data-ui="Highlighter-root"
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
						data-ui="Highlighter-hole"
						className={slots.hole()}
						style={
							rect
								? {
										top: Math.max(
											0,
											Math.floor(rect.top - padding),
										),
										left: Math.max(
											0,
											Math.floor(rect.left - padding),
										),
										width: Math.ceil(
											rect.width + padding * 2,
										),
										height: Math.ceil(
											rect.height + padding * 2,
										),
									}
								: undefined
						}
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
