import { useCls, withCls } from "@use-pico/cls";
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

const BaseHighlighter: FC<Highlighter.Props> = ({
	visible,
	rect,
	padding = 8,
	onBackdropClick,
	cls = HighlighterCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			center: rect === undefined,
		},
	});

	return visible ? (
		<div
			data-ui="Highlighter-root"
			className={slots.root()}
			onClick={onBackdropClick}
		>
			<div
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
								width: Math.ceil(rect.width + padding * 2),
								height: Math.ceil(rect.height + padding * 2),
							}
						: undefined
				}
			/>
		</div>
	) : null;
};

export const Highlighter = withCls(BaseHighlighter, HighlighterCls);
