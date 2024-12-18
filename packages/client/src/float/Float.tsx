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
import {
    useRef,
    useState,
    type FC,
    type PropsWithChildren,
    type ReactNode,
} from "react";
import { FloatContext } from "./FloatContext";
import { FloatCss } from "./FloatCss";

export namespace Float {
	export interface Props extends FloatCss.Props<PropsWithChildren> {
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
	variant,
	tva = FloatCss,
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
	const tv = tva({ mounted: isMounted, ...variant, css }).slots;

	return (
		<>
			<button
				type={"button"}
				ref={refs.setReference}
				{...getReferenceProps()}
				disabled={disabled}
				className={tv.target()}
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
					className={tv.portal()}
					{...getFloatingProps()}
					onClick={
						closeOnClick ?
							() => {
								setIsOpen(false);
							}
						:	undefined
					}
				>
					<FloatContext.Provider
						value={{
							close() {
								setIsOpen(false);
							},
						}}
					>
						{children}
					</FloatContext.Provider>
					<FloatingArrow
						context={context}
						ref={arrowRef}
						className={"fill-white"}
					/>
				</div>
			</FloatingPortal>
		</>
	);
};
