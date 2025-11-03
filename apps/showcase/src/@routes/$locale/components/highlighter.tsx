import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@use-pico/client/ui/button";
import {
	Highlighter,
	HighlighterTarget,
} from "@use-pico/client/ui/highlighter";
import { Typo } from "@use-pico/client/ui/typo";
import { tvc } from "@use-pico/cls";
import { useId, useRef, useState } from "react";

export const Route = createFileRoute("/$locale/components/highlighter")({
	component() {
		const [isHighlighted, setIsHighlighted] = useState(false);
		const [isTargetHighlighted, setIsTargetHighlighted] = useState(false);
		const [rect, setRect] = useState<Highlighter.Rect>();
		const [selector, setSelector] = useState<string>();
		const targetRef = useRef<HTMLButtonElement>(null);
		const noteRef = useRef<HTMLDivElement>(null);
		const targetButtonId = useId();

		const handleHighlight = () => {
			if (targetRef.current) {
				setRect(targetRef.current?.getBoundingClientRect());
				setTimeout(() => {
					setRect(noteRef.current?.getBoundingClientRect());
				}, 1000);
				setIsHighlighted(true);
			}
		};

		const handleClose = () => {
			setIsHighlighted(false);
		};

		const handleTargetHighlight = () => {
			// Start with the button selector
			setSelector(`#${targetButtonId}`);
			setIsTargetHighlighted(true);

			// After 1 second, switch to the note selector to show reactivity
			setTimeout(() => {
				setSelector("div[data-note]");
			}, 1000);
		};

		const handleTargetClose = () => {
			setIsTargetHighlighted(false);
		};

		return (
			<div
				className={tvc([
					"grid",
					"grid-cols-1",
					"content-center",
					"justify-items-center",
					"h-full",
					"gap-8",
				])}
			>
				<div
					className={tvc([
						"flex",
						"flex-col",
						"items-center",
						"gap-4",
					])}
				>
					<Button
						buttonRef={targetRef}
						onClick={handleHighlight}
						tone="primary"
						size="lg"
						label="Click me to highlight this element!"
					/>

					<Button
						id={targetButtonId}
						onClick={handleTargetHighlight}
						tone="secondary"
						size="lg"
						label="Click me to highlight with HighlighterTarget!"
					/>
				</div>

				<div
					data-note
					className={tvc([
						"text-sm",
						"text-slate-600",
						"text-center",
						"max-w-md",
					])}
				>
					The Highlighter component creates a backdrop overlay with a
					"hole" that highlights the target element. The first button
					uses manual rect calculation, while the second uses
					HighlighterTarget with a reactive CSS selector that changes
					after 1 second to demonstrate selector reactivity.
					<Typo
						ref={noteRef}
						label={
							"Keep in mind rect is intentionally in this example shown with little delay in another position to showcase transition animation"
						}
						font="bold"
						size={"lg"}
					/>
				</div>

				<Highlighter
					visible={isHighlighted}
					rect={rect}
					padding={12}
					onBackdropClick={handleClose}
					tweak={{
						slot: {
							hole: {
								class: [
									"ring-red-500",
								],
							},
						},
					}}
				/>

				<HighlighterTarget
					selector={selector || `#${targetButtonId}`}
					visible={isTargetHighlighted}
					padding={12}
					onBackdropClick={handleTargetClose}
					tweak={{
						slot: {
							hole: {
								class: [
									"ring-blue-500",
								],
							},
						},
					}}
				/>
			</div>
		);
	},
});
