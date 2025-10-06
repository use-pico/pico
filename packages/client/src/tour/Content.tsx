import {
	FloatingPortal,
	autoUpdate as floatingAutoUpdate,
	flip as floatingFlip,
	offset as floatingOffset,
	shift as floatingShift,
	size as floatingSize,
	limitShift,
	type Placement,
	useFloating,
} from "@floating-ui/react";
import { useCls } from "@use-pico/cls";
import {
	type FC,
	type PropsWithChildren,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { ContentCls } from "./ContentCls";

export namespace Content {
	export interface Props extends ContentCls.Props<PropsWithChildren> {
		referenceElement: HTMLElement | null;
		placement?: Placement;
		maxWidthPx?: number;
		margin?: number;
		contentKey: string | number;
	}
}

export const Content: FC<Content.Props> = ({
	referenceElement,
	placement = "bottom",
	maxWidthPx = 420,
	margin = 16,
	contentKey,
	children,
	cls = ContentCls,
	tweak,
}) => {
	const centerRef = useRef<HTMLDivElement>(null);

	const { slots } = useCls(cls, tweak);

	const common = useMemo(
		() => [
			floatingSize({
				padding: margin,
				apply({ availableWidth, availableHeight, elements }) {
					const node = elements.floating as HTMLElement;
					node.style.maxWidth = `${Math.min(availableWidth, maxWidthPx)}px`;
					node.style.maxHeight = `${Math.max(0, availableHeight)}px`;
				},
			}),
			floatingShift({
				padding: margin,
				limiter: limitShift(),
			}),
		],
		[
			maxWidthPx,
			margin,
		],
	);

	const middleware = useMemo(
		() =>
			referenceElement
				? [
						floatingOffset(12),
						floatingFlip(),
						...common,
					]
				: [
						floatingOffset(({ rects }) => {
							return (
								-rects.reference.height / 2 -
								rects.floating.height / 2
							);
						}),
						...common,
					],
		[
			referenceElement,
			common,
		],
	);

	const { x, y, strategy, refs } = useFloating({
		placement: referenceElement ? placement : "top",
		strategy: "fixed",
		whileElementsMounted: floatingAutoUpdate,
		middleware,
	});

	useEffect(() => {
		const el = referenceElement ?? centerRef.current;
		if (!el) {
			return;
		}
		refs.setReference(el);
	}, [
		referenceElement,
		refs,
	]);

	return (
		<>
			<div
				data-ui="Tour-Content-center"
				ref={centerRef}
				aria-hidden
				className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none"
			/>

			<FloatingPortal>
				<div
					data-ui="Tour-Content-root"
					ref={refs.setFloating}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
						willChange: "transform",
					}}
					className={slots.root()}
				>
					<div
						data-ui="Tour-Content-tooltip"
						className={slots.tooltip()}
						key={contentKey}
					>
						{children}
					</div>
				</div>
			</FloatingPortal>
		</>
	);
};
