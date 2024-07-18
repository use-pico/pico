import {
	FloatingArrow,
	FloatingPortal,
	arrow,
	autoUpdate,
	flip,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useTransitionStyles,
	type UseFloatingOptions,
} from "@floating-ui/react";
import { cssOf, type Css } from "@use-pico/common";
import {
	useRef,
	useState,
	type FC,
	type PropsWithChildren,
	type ReactNode,
} from "react";
import { FloatStore } from "./Float/FloatStore";

export namespace Float {
	export interface Props extends PropsWithChildren, Css<"button"> {
		target: ReactNode;
		action?: "hover" | "click";
		disabled?: boolean;
		/**
		 * Close the float when clicking on it.
		 */
		closeOnClick?: boolean;
		delay?: number;
		float?: Omit<
			UseFloatingOptions,
			"middleware" | "whileElementsMounted" | "open" | "onOpenChange"
		>;
	}
}

export const Float: FC<Float.Props> = ({
	target,
	action = "hover",
	disabled = false,
	closeOnClick = false,
	delay = 100,
	float,
	css,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef(null);
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: "top",
		whileElementsMounted: autoUpdate,
		middleware: [
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
	const { getReferenceProps, getFloatingProps } = useInteractions([
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
	const { isMounted, styles } = useTransitionStyles(context);

	return (
		<>
			<button
				type={"button"}
				ref={refs.setReference}
				{...getReferenceProps()}
				disabled={disabled}
				className={cssOf("flex justify-center items-center", css?.button)}
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
					className={cssOf(!isMounted && "hidden")}
					{...getFloatingProps()}
					onClick={
						closeOnClick ?
							() => {
								setIsOpen(false);
							}
						:	undefined
					}
				>
					<FloatStore.Provider
						values={{
							close() {
								setIsOpen(false);
							},
						}}
					>
						{children}
					</FloatStore.Provider>
					<FloatingArrow
						context={context}
						ref={arrowRef}
						className={cssOf(
							"fill-white",
							// "[&>path:first-of-type]:stroke-slate-300",
						)}
					/>
				</div>
			</FloatingPortal>
		</>
	);
};
