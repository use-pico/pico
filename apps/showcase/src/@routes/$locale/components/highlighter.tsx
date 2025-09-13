import { createFileRoute } from "@tanstack/react-router";
import { Button, Highlighter } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import { useRef, useState } from "react";

export const Route = createFileRoute("/$locale/components/highlighter")({
	component() {
		const [isHighlighted, setIsHighlighted] = useState(false);
		const [rect, setRect] = useState<Highlighter.Rect | null>(null);
		const targetRef = useRef<HTMLButtonElement>(null);

		const handleHighlight = () => {
			if (targetRef.current) {
				const elementRect = targetRef.current.getBoundingClientRect();
				setRect({
					x: elementRect.left,
					y: elementRect.top,
					width: elementRect.width,
					height: elementRect.height,
				});
				setIsHighlighted(true);
			}
		};

		const handleClose = () => {
			setIsHighlighted(false);
			setRect(null);
		};

		return (
			<div
				className={tvc([
					"grid",
					"grid-cols-1",
					"content-center",
					"justify-items-center",
					"h-full",
				])}
			>
				<Button
					ref={targetRef}
					onClick={handleHighlight}
					tone="primary"
					size="lg"
				>
					Click me to highlight this element!
				</Button>

				<div
					className={tvc([
						"text-sm",
						"text-slate-600",
						"text-center",
						"max-w-md",
					])}
				>
					The Highlighter component creates a backdrop overlay with a
					"hole" that highlights the target element. Click the button
					above to see it in action!
				</div>

				{isHighlighted && rect && (
					<Highlighter
						rect={rect}
						padding={12}
						backdropOpacity={0.7}
						onBackdropClick={handleClose}
					/>
				)}
			</div>
		);
	},
});
