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
import { type Cls, useCls } from "@use-pico/cls";
import { type FC, type ReactNode, useState } from "react";
import { ModalCls } from "./ModalCls";

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
	disabled = false,
	defaultOpen = false,
	outside = false,
	size = "md",
	tweak,
	cls = ModalCls,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const nodeId = useFloatingNodeId();
	const { refs, context } = useFloating({
		nodeId,
		open: isOpen,
		onOpenChange: setIsOpen,
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
	const { isMounted, styles } = useTransitionStyles(context, {
		duration: 400,
		initial: {
			transform: "translateY(10%)",
			scale: 0.975,
			opacity: 0,
		},
		open: {
			transform: "translateY(0)",
			scale: 1,
			opacity: 1,
		},
		common: {
			transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
		},
	});
	const { slots } = useCls(cls, tweak, {
		variant: {
			disabled,
			size,
		},
	});

	return (
		<>
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
						>
							<FloatingFocusManager
								context={context}
								modal
							>
								<div
									ref={refs.setFloating}
									{...getFloatingProps()}
									data-ui="Modal-modal"
									role="dialog"
									aria-modal="true"
									className={slots.modal()}
								>
									{children({
										close: () => setIsOpen(false),
									})}
								</div>
							</FloatingFocusManager>
						</FloatingOverlay>
					</FloatingPortal>
				)}
			</FloatingNode>
		</>
	);
};
