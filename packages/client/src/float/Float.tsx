import {
	autoUpdate,
	FloatingOverlay,
	FloatingPortal,
	flip,
	offset,
	shift,
	type UseFloatingOptions,
	useClick,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useTransitionStyles,
} from "@floating-ui/react";
import {
	type FC,
	type PropsWithChildren,
	type ReactNode,
	useState,
} from "react";
import { FloatCls } from "./FloatCls";
import { FloatContext } from "./FloatContext";

export namespace Float {
	export interface Props extends FloatCls.Props<PropsWithChildren> {
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
		/**
		 * Whether to show a backdrop overlay when float is open
		 */
		withOverlay?: boolean;
	}
}

export const Float: FC<Float.Props> = ({
	target,
	action = "hover",
	disabled = false,
	closeOnClick = false,
	delay = 100,
	float,
	withOverlay = false,
	tva = FloatCls,
	cls,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);
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
		],
		...float,
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useHover(context, {
			enabled: disabled ? false : action === "hover",
			delay,
		}),
		useClick(context, {
			enabled: disabled ? false : action === "click",
		}),
		useFocus(context),
		useDismiss(context),
	]);
	const { isMounted, styles } = useTransitionStyles(context);
	const classes = tva.create(cls, ({ what }) => ({
		variant: what.variant({
			mounted: isMounted,
		}),
	}));

	return (
		<>
			<div
				ref={refs.setReference}
				{...getReferenceProps()}
				className={classes.target()}
			>
				{target}
			</div>
			<FloatingPortal>
				{withOverlay && isMounted ? (
					<FloatingOverlay
						lockScroll={false}
						style={styles}
						className="fixed inset-0 bg-slate-200/50 backdrop-blur-[2px]"
					>
						<div
							ref={refs.setFloating}
							style={floatingStyles}
							className={classes.portal()}
							{...getFloatingProps()}
							onClick={
								closeOnClick
									? () => {
											setIsOpen(false);
										}
									: undefined
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
						</div>
					</FloatingOverlay>
				) : (
					<div
						ref={refs.setFloating}
						style={{
							...floatingStyles,
							...styles,
						}}
						className={classes.portal()}
						{...getFloatingProps()}
						onClick={
							closeOnClick
								? () => {
										setIsOpen(false);
									}
								: undefined
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
					</div>
				)}
			</FloatingPortal>
		</>
	);
};
