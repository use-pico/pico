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
import { type Cls, tvc, useCls } from "@use-pico/cls";
import { type FC, type ReactNode, useMemo } from "react";
import { Action } from "../action/Action";
import { CloseIcon } from "../icon/CloseIcon";
import { Icon } from "../icon/Icon";
import { createModalStore } from "./createModalStore";
import { ModalCls } from "./ModalCls";
import { ModalContext } from "./ModalContext";

export namespace Modal {
	export namespace Children {
		export interface Props {
			close(): void;
		}

		export type Render = (props: Props) => ReactNode;
	}

	export interface Props extends ModalCls.Props {
		/**
		 * The target element that will open the modal.
		 */
		target: ReactNode;
		icon?: Icon.Type;
		textTitle: ReactNode;
		disabled?: boolean;
		defaultOpen?: boolean;
		size?: Cls.VariantOf<ModalCls, "size">;
		/**
		 * Close the modal when clicking outside of it.
		 */
		outside?: boolean;
		children: Children.Render;
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
	size = "md",
	tweak,
	cls = ModalCls,
	children,
}) => {
	const useModalStore = useMemo(
		() =>
			createModalStore({
				defaultOpen,
			}),
		[
			defaultOpen,
		],
	);
	const close = useModalStore((state) => state.close);
	const nodeId = useFloatingNodeId();
	const { refs, context } = useFloating({
		nodeId,
		open: useModalStore((state) => state.isOpen),
		onOpenChange: useModalStore((state) => state.toggle),
	});
	const click = useClick(context, {
		enabled: !disabled,
	});
	const dismiss = useDismiss(context, {
		outsidePress: outside,
		enabled: !disabled,
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);
	const { isMounted, styles } = useTransitionStyles(context);
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			disabled,
			size,
		}),
	}));

	return (
		<ModalContext value={useModalStore}>
			<div
				ref={refs.setReference}
				{...getReferenceProps({
					disabled,
				})}
				className={slots.target()}
			>
				{target}
			</div>
			<FloatingNode id={nodeId}>
				{isMounted && (
					<FloatingPortal>
						<FloatingOverlay
							lockScroll
							style={styles}
							data-ui="Modal-root"
							className={slots.root()}
							onDoubleClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
							}}
						>
							<FloatingFocusManager context={context}>
								<div
									ref={refs.setFloating}
									{...getFloatingProps()}
									data-ui="Modal-modal"
									className={slots.modal()}
								>
									<div
										className={tvc([
											"border-b",
											"border-slate-200",
											"mb-2",
											"py-1.5",
											"flex",
											"flex-row",
											"items-center",
											"justify-between",
											"select-none",
										])}
									>
										<div
											className={tvc(
												"flex",
												"flex-row",
												"items-center",
												"gap-2",
												"pr-4",
											)}
										>
											<Icon
												icon={icon}
												size={"sm"}
											/>
											<div
												className={tvc(
													"text-lg",
													"font-semibold",
													"text-slate-700",
												)}
											>
												{textTitle}
											</div>
										</div>
										<Action
											iconEnabled={CloseIcon}
											onClick={() => close()}
											tweak={({ what }) => ({
												variant: what.variant({
													tone: "neutral",
													theme: "light",
												}),
											})}
											size={"sm"}
										/>
									</div>
									{children({
										close,
									})}
								</div>
							</FloatingFocusManager>
						</FloatingOverlay>
					</FloatingPortal>
				)}
			</FloatingNode>
		</ModalContext>
	);
};
