import { useCls, withCls } from "@use-pico/cls";
import type { FC } from "react";
import { HighlighterCls } from "./HighlighterCls";

export namespace Highlighter {
	export interface Rect {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	export interface Props extends HighlighterCls.Props {
		/** Viewport-relative rectangle of the target element */
		rect: Rect;
		/** Extra padding expanded around the rectangle */
		padding?: number;
		/** Backdrop darkness 0..1 applied via giant box-shadow */
		backdropOpacity?: number;
		/** Called when user clicks the backdrop (including the hole; hole is not click-through) */
		onBackdropClick?: () => void;
	}
}

export const BaseHighlighter: FC<Highlighter.Props> = ({
	rect,
	padding = 8,
	backdropOpacity = 0.6,
	onBackdropClick,
	cls = HighlighterCls,
	tweak,
}) => {
	const slots = useCls(cls, tweak);

	const x = Math.max(0, Math.floor(rect.x - padding));
	const y = Math.max(0, Math.floor(rect.y - padding));
	const width = Math.ceil(rect.width + padding * 2);
	const height = Math.ceil(rect.height + padding * 2);

	return (
		<div
			className={slots.root()}
			onClick={onBackdropClick}
		>
			<div
				className={slots.hole()}
				style={{
					top: y,
					left: x,
					width,
					height,
					// boxShadow: `0 0 0 100vh rgba(0,0,0,${backdropOpacity})`,
					// transition:
					// 	"top 300ms ease, left 300ms ease, width 300ms ease, height 300ms ease",
				}}
			/>
		</div>
	);
};

export const Highlighter = withCls(BaseHighlighter, HighlighterCls);
