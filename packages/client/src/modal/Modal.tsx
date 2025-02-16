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
import { isCallable, isString } from "@use-pico/common";
import { useMemo, type FC, type ReactNode } from "react";
import { Action } from "../action/Action";
import { CloseIcon } from "../icon/CloseIcon";
import { Icon } from "../icon/Icon";
import { ModalContext } from "./ModalContext";
import { ModalCss } from "./ModalCss";
import { createModalStore } from "./createModalStore";

export namespace Modal {
	export interface Props extends ModalCss.Props {
		/**
		 * The target element that will open the modal.
		 */
		target: ReactNode;
		icon?: string | ReactNode;
		textTitle?: ReactNode;
		disabled?: boolean;
		defaultOpen?: boolean;
		/**
		 * Close the modal when clicking outside of it.
		 */
		outside?: boolean;
		children: FC<{ close(): void }> | ReactNode;
	}

	export type PropsEx = Partial<Props>;
}

export const Modal: FC<Modal.Props> = ({
	target,
	icon,
	textTitle,
	disabled = false,
	defaultOpen = false,
	outside = false,
	variant,
	css,
	tva = ModalCss,
	children: Children,
}) => {
	const useModalStore = useMemo(() => createModalStore({ defaultOpen }), []);
	const close = useModalStore((state) => state.close);
	const nodeId = useFloatingNodeId();
	const { refs, context } = useFloating({
		nodeId,
		open: useModalStore((state) => state.isOpen),
		onOpenChange: useModalStore((state) => state.toggle),
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
		<ModalContext.Provider value={useModalStore}>
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
								<FloatingFocusManager context={context}>
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
												{textTitle && (
													<div
														className={"text-lg font-semibold text-slate-700"}
													>
														{textTitle}
													</div>
												)}
											</div>
											<Action
												iconEnabled={CloseIcon}
												onClick={() => close()}
											/>
										</div>
										{isCallable(Children) ?
											<Children close={close} />
										:	Children}
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
