import {
	FloatingFocusManager,
	FloatingNode,
	FloatingOverlay,
	FloatingPortal,
	useClick,
	useDismiss,
	useFloating,
	useFloatingNodeId,
	useInteractions,
	useTransitionStyles,
} from "@floating-ui/react";
import { Css, cssOf } from "@use-pico/common";
import {
	useState,
	type FC,
	type PropsWithChildren,
	type ReactNode,
} from "react";
import { CloseIcon } from "../icon/CloseIcon";
import { BlockProvider } from "../provider/BlockProvider";
import { Action } from "./Action";
import { Icon } from "./Icon";
import { LoadingOverlay } from "./LoadingOverlay";
import { ModalStore } from "./Modal/ModelStore";

export namespace Modal {
	export interface Props extends PropsWithChildren, Css<"root" | "target"> {
		/**
		 * The target element that will open the modal.
		 */
		target: ReactNode;
		icon?: string;
		title?: ReactNode;
		disabled?: boolean;
		/**
		 * Close the modal when clicking outside of it.
		 */
		outside?: boolean;
	}

	export type PropsEx = Partial<Props>;
}

export const Modal: FC<Modal.Props> = ({
	target,
	icon,
	title,
	disabled = false,
	outside = false,
	css,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const nodeId = useFloatingNodeId();
	const { refs, context } = useFloating({
		nodeId,
		open: isOpen,
		onOpenChange: setIsOpen,
	});
	const click = useClick(context);
	const dismiss = useDismiss(context, {
		outsidePress: outside,
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);
	const { isMounted, styles } = useTransitionStyles(context);

	return (
		<ModalStore.Provider
			values={{
				close() {
					setIsOpen(false);
				},
			}}
		>
			<div
				ref={refs.setReference}
				{...getReferenceProps({
					disabled,
				})}
				className={cssOf(disabled && "pointer-events-none", css?.target)}
			>
				{target}
			</div>
			<FloatingNode id={nodeId}>
				{isMounted && (
					<>
						<FloatingPortal>
							<FloatingOverlay
								lockScroll
								style={styles}
								className={cssOf(
									"bg-slate-500 bg-opacity-75 backdrop-blur-sm",
									"flex justify-center py-12",
								)}
							>
								<FloatingFocusManager
									initialFocus={-1}
									context={context}
								>
									<BlockProvider>
										<div
											ref={refs.setFloating}
											{...getFloatingProps()}
											className={cssOf(
												"bg-white rounded shadow-lg p-4 w-fit h-fit max-h-full overflow-y-auto",
												"relative",
												"w-2/3",
												"max-w-1/2",
												css?.root,
											)}
										>
											<LoadingOverlay />
											<div
												className={cssOf(
													"border-b border-slate-200 mb-2 py-1.5",
													"flex flex-row items-center justify-between",
													"select-none",
												)}
											>
												<div
													className={cssOf(
														"flex flex-row items-center gap-2",
														"pr-4",
													)}
												>
													{icon && (
														<Icon
															icon={icon}
															size={"xl"}
														/>
													)}
													{title && (
														<div
															className={cssOf(
																"text-lg font-semibold text-slate-700",
															)}
														>
															{title}
														</div>
													)}
												</div>
												<Action
													icon={{
														enabled: CloseIcon,
													}}
													onClick={() => setIsOpen(false)}
												/>
											</div>
											{children}
										</div>
									</BlockProvider>
								</FloatingFocusManager>
							</FloatingOverlay>
						</FloatingPortal>
					</>
				)}
			</FloatingNode>
		</ModalStore.Provider>
	);
};
