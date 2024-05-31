"use client";

import {
	arrow,
	autoUpdate,
	flip,
	FloatingArrow,
	FloatingPortal,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	type UseFloatingOptions,
	useFocus,
	useHover,
	useInteractions,
	useTransitionStyles
}                   from "@floating-ui/react";
import {cn}         from "@use-pico/common";
import {
	type FC,
	type PropsWithChildren,
	type ReactNode,
	useRef,
	useState
}                   from "react";
import {FloatStore} from "./Float/FloatStore";

export namespace Float {
	export type Props = PropsWithChildren<{
		target: ReactNode;
		action?: "hover" | "click";
		/**
		 * Close the float when clicking on it.
		 */
		closeOnClick?: boolean;
		delay?: number;
		float?: Omit<UseFloatingOptions, "middleware" | "whileElementsMounted" | "open" | "onOpenChange">;
	}>;
}

export const Float: FC<Float.Props> = (
	{
		target,
		action = "hover",
		closeOnClick = false,
		delay = 100,
		float,
		children,
	}
) => {
	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef(null);
	const {
		refs,
		floatingStyles,
		context,
	} = useFloating({
		open:                 isOpen,
		onOpenChange:         setIsOpen,
		placement:            "top",
		whileElementsMounted: autoUpdate,
		middleware:           [
			offset(10),
			flip({
				fallbackAxisSideDirection: "start",
			}),
			shift(),
			arrow({
				element: arrowRef,
			}),
		],
		...float,
	});
	const {
		getReferenceProps,
		getFloatingProps,
	} = useInteractions([
		useHover(context, {
			enabled: action === "hover",
			delay,
		}),
		useClick(context, {
			enabled: action === "click",
		}),
		useFocus(context),
		useDismiss(context),
	]);
	const {
		isMounted,
		styles
	} = useTransitionStyles(context);

	return <>
		<button
			type={"button"}
			ref={refs.setReference}
			{...getReferenceProps()}
		>
			{target}
		</button>
		<FloatingPortal>
			<div
				ref={refs.setFloating}
				style={{
					...floatingStyles,
					...styles,
				}}
				className={cn(
					{"hidden": !isMounted},
				)}
				{...getFloatingProps()}
				onClick={closeOnClick ? () => {
					setIsOpen(false);
				} : undefined}
			>
				<FloatStore.Provider
					values={{
						close() {
							setIsOpen(false);
						}
					}}
				>
					{children}
				</FloatStore.Provider>
				<FloatingArrow
					context={context}
					ref={arrowRef}
					className={cn(
						"fill-white",
						// "[&>path:first-of-type]:stroke-slate-300",
					)}
				/>
			</div>
		</FloatingPortal>
	</>;
};
