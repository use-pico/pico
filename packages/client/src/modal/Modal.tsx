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
import { isString } from "@use-pico/common";
import {
    useState,
    type FC,
    type PropsWithChildren,
    type ReactNode,
} from "react";
import { Action } from "../action/Action";
import { CloseIcon } from "../icon/CloseIcon";
import { Icon } from "../icon/Icon";
import { ModalContext } from "./ModalContext";
import { ModalCss } from "./ModalCss";

export namespace Modal {
	export interface Props extends ModalCss.Props<PropsWithChildren> {
		/**
		 * The target element that will open the modal.
		 */
		target: ReactNode;
		icon?: string | ReactNode;
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
	variant,
	css,
	tva = ModalCss,
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

	const tv = tva({ disabled, ...variant, css }).slots;

	return (
		<ModalContext.Provider
			value={{
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
				className={tv.target()}
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
								className={tv.base()}
							>
								<FloatingFocusManager
									initialFocus={-1}
									context={context}
								>
									<div
										ref={refs.setFloating}
										{...getFloatingProps()}
										className={tv.modal()}
									>
										<div
											className={
												"border-b border-slate-200 mb-2 py-1.5 flex flex-row items-center justify-between select-none"
											}
										>
											<div className={"flex flex-row items-center gap-2 pr-4"}>
												{icon &&
													(isString(icon) ?
														<Icon
															icon={icon}
															variant={{ size: "xl" }}
														/>
													:	icon)}
												{title && (
													<div
														className={"text-lg font-semibold text-slate-700"}
													>
														{title}
													</div>
												)}
											</div>
											<Action
												iconEnabled={CloseIcon}
												onClick={() => setIsOpen(false)}
											/>
										</div>
										{children}
									</div>
								</FloatingFocusManager>
							</FloatingOverlay>
						</FloatingPortal>
					</>
				)}
			</FloatingNode>
		</ModalContext.Provider>
	);
};
