"use client";

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
	useTransitionStyles
}                       from "@floating-ui/react";
import {cn}             from "@use-pico/common";
import {
	type FC,
	type PropsWithChildren,
	type ReactNode,
	useState
}                       from "react";
import {CloseIcon}      from "../icon/CloseIcon";
import {BlockProvider}  from "../provider/BlockProvider";
import {Action}         from "./Action";
import {Icon}           from "./Icon";
import {LoadingOverlay} from "./LoadingOverlay";
import {ModalStore}     from "./Modal/ModelStore";

export namespace Modal {
	export type Props = PropsWithChildren<
		{
			/**
			 * The target element that will open the modal.
			 */
			target: ReactNode;
			icon?: string;
			title?: ReactNode;
			/**
			 * Close the modal when clicking outside of it.
			 */
			outside?: boolean;
			style?: {
				target?: cn.ClassNames;
			};
		} & cn.WithClass>;

	export type PropsEx = Partial<Props>;
}

export const Modal: FC<Modal.Props> = (
	{
		target,
		icon,
		title,
		outside = false,
		cx,
		style,
		children,
	}
) => {
	const [isOpen, setIsOpen] = useState(false);
	const nodeId = useFloatingNodeId();
	const {
		refs,
		context
	} = useFloating({
		nodeId,
		open:         isOpen,
		onOpenChange: setIsOpen,
	});
	const click = useClick(context);
	const dismiss = useDismiss(context, {
		outsidePress: outside,
	});
	const {
		getReferenceProps,
		getFloatingProps
	} = useInteractions([
		click,
		dismiss,
	]);
	const {
		isMounted,
		styles
	} = useTransitionStyles(context);

	return <ModalStore.Provider
		values={{
			close() {
				setIsOpen(false);
			}
		}}
	>
		<button
			type={"button"}
			ref={refs.setReference}
			{...getReferenceProps()}
			className={cn(
				style?.target,
			)}
		>
			{target}
		</button>
		<FloatingNode
			id={nodeId}
		>
			{isMounted && <>
				<FloatingPortal>
					<FloatingOverlay
						lockScroll
						style={styles}
						className={cn(
							"bg-slate-500 bg-opacity-75 backdrop-blur-sm",
							"flex justify-center py-12",
						)}
					>
						<FloatingFocusManager
							context={context}
						>
							<BlockProvider>
								<div
									ref={refs.setFloating}
									{...getFloatingProps()}
									className={cn(
										"bg-white rounded shadow-lg p-4 w-fit h-fit",
										"relative",
										"w-1/2",
										"max-w-1/2",
										cx,
									)}
								>
									<LoadingOverlay/>
									<div
										className={cn(
											"border-b border-slate-200 mb-2 py-1.5",
											"flex flex-row items-center justify-between",
											"select-none",
										)}
									>
										<div
											className={cn(
												"flex flex-row items-center gap-2",
												"pr-4",
											)}
										>
											{icon && <Icon
												icon={icon}
												size={"xl"}
											/>}
											{title && <div
												className={cn(
													"text-lg font-semibold text-slate-700",
												)}
											>
												{title}
											</div>}
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
			</>}
		</FloatingNode>
	</ModalStore.Provider>;
};
