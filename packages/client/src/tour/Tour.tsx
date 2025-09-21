import type { Placement } from "@floating-ui/react";
import { useCls } from "@use-pico/cls";
import {
	type FC,
	type ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import { Action } from "../action/Action";
import { Button } from "../button/Button";
import { Highlighter } from "../highlighter/Highlighter";
import { useHighlightRectangle } from "../hook/useHighlightRectangle";
import { useInViewport } from "../hook/useInViewport";
import { ArrowLeftIcon } from "../icon/ArrowLeftIcon";
import { ArrowRightIcon } from "../icon/ArrowRightIcon";
import { CloseIcon } from "../icon/CloseIcon";
import { Tx } from "../tx/Tx";
import { Typo } from "../typo/Typo";
import { Content } from "./Content";
import { TourCls } from "./TourCls";

export namespace Tour {
	export interface Step {
		selector: string | undefined;
		title: string;
		description?: string;
		padding?: number;
		placement?: Placement;
	}

	export namespace Progress {
		export interface Props {
			isFirst: boolean;
			isLast: boolean;
			progress: number;
			total: number;
			percent: number;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export namespace Close {
		export interface Props {
			isFirst: boolean;
			isLast: boolean;
			disabled: boolean;
			close(): void;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export namespace Title {
		export interface Props {
			title: string;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export namespace Description {
		export interface Props {
			description: string | undefined;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export namespace PrevButton {
		export interface Props {
			isFirst: boolean;
			isLast: boolean;
			disabled: boolean;
			/**
			 * If Tour is "first", this function will be no-op, so it's safe to call
			 * it even if it may not make sense.
			 */
			prev(): void;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export namespace NextButton {
		export interface Props {
			isFirst: boolean;
			isLast: boolean;
			disabled: boolean;
			/**
			 * If Tour is "last", this function will be no-op, so it's safe to call
			 * it even if it may not make sense.
			 */
			next(): void;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export namespace FinishButton {
		export interface Props {
			isFirst: boolean;
			isLast: boolean;
			finish(): void;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export interface Props extends TourCls.Props {
		steps: Step[];
		isOpen: boolean;
		initialStepIndex?: number;
		placement?: Placement;
		renderClose?: Close.RenderFn;
		renderTitle?: Title.RenderFn;
		renderDescription?: Description.RenderFn;
		renderProgress?: Progress.RenderFn;
		renderPrevButton?: PrevButton.RenderFn;
		renderNextButton?: NextButton.RenderFn;
		renderFinishButton?: FinishButton.RenderFn;
		onClose?: () => void;
	}
}

const DefaultClose: Tour.Close.RenderFn = ({ close }) => {
	return (
		<Action
			iconEnabled={CloseIcon}
			iconDisabled={CloseIcon}
			onClick={close}
			size="sm"
			tone={"neutral"}
			theme={"light"}
		/>
	);
};

const DefaultTitle: Tour.Title.RenderFn = ({ title }) => {
	return <div>{title}</div>;
};

const DefaultDescription: Tour.Description.RenderFn = ({ description }) => {
	return (
		<Typo
			label={description}
			size="sm"
			tone={"secondary"}
			theme={"light"}
		/>
	);
};

const DefaultProgress: Tour.Progress.RenderFn = ({
	progress,
	percent,
	total,
}) => {
	return (
		<Typo
			label={`${progress} / ${total} (${percent.toFixed(0)}%)`}
			font={"bold"}
			size={"sm"}
			tone={"primary"}
			theme={"light"}
		/>
	);
};

const DefaultPrevButton: Tour.PrevButton.RenderFn = ({ prev, disabled }) => {
	return (
		<Button
			iconEnabled={ArrowLeftIcon}
			iconDisabled={ArrowLeftIcon}
			onClick={prev}
			disabled={disabled}
			size="sm"
		>
			<Tx label={"Previous (tour)"} />
		</Button>
	);
};

const DefaultNextButton: Tour.NextButton.RenderFn = ({ next, disabled }) => {
	return (
		<Button
			iconEnabled={ArrowRightIcon}
			iconDisabled={ArrowRightIcon}
			onClick={next}
			disabled={disabled}
			size="sm"
		>
			<Tx label={"Next (tour)"} />
		</Button>
	);
};

const DefaultFinishButton: Tour.FinishButton.RenderFn = ({ finish }) => {
	return (
		<Button
			onClick={finish}
			size="sm"
			tone="warning"
		>
			<Tx label={"Finish (tour)"} />
		</Button>
	);
};

export const Tour: FC<Tour.Props> = ({
	steps,
	isOpen,
	initialStepIndex = 0,
	placement = "bottom",
	renderClose = DefaultClose,
	renderTitle = DefaultTitle,
	renderDescription = DefaultDescription,
	renderProgress = DefaultProgress,
	renderPrevButton = DefaultPrevButton,
	renderNextButton = DefaultNextButton,
	renderFinishButton = DefaultFinishButton,
	onClose,
	cls = TourCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);
	const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

	const currentStep = steps[currentStepIndex];

	const { targetElement, boundingRectangle } = useHighlightRectangle(
		currentStep?.selector,
	);

	const targetInView = useInViewport(targetElement, {
		threshold: 1,
	});

	const handleClose = useCallback(() => {
		setCurrentStepIndex(initialStepIndex);
		onClose?.();
	}, [
		initialStepIndex,
		onClose,
	]);

	// Keep the target centered if not fully in view
	useEffect(() => {
		if (!isOpen || !targetElement) {
			return;
		}
		if (!targetInView) {
			targetElement.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			});
		}
	}, [
		isOpen,
		targetElement,
		targetInView,
	]);

	const goToNext = useCallback(() => {
		if (currentStepIndex < steps.length - 1)
			setCurrentStepIndex((i) => i + 1);
		else {
			handleClose();
		}
	}, [
		handleClose,
		currentStepIndex,
		steps.length,
	]);

	const goToPrevious = useCallback(() => {
		setCurrentStepIndex((i) => Math.max(0, i - 1));
	}, []);

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleClose();
			}
			if (e.key === "ArrowRight") {
				goToNext();
			}
			if (e.key === "ArrowLeft") {
				goToPrevious();
			}
		};
		window.addEventListener("keydown", onKeyDown as any);
		return () => {
			window.removeEventListener("keydown", onKeyDown as any);
		};
	}, [
		isOpen,
		goToNext,
		goToPrevious,
		handleClose,
	]);

	const padding = currentStep?.padding ?? 8;
	const isFirst = currentStepIndex === 0;
	const isLast = currentStepIndex === steps.length - 1;

	return (
		<>
			<Highlighter
				visible={isOpen}
				rect={boundingRectangle}
				padding={padding}
				onBackdropClick={handleClose}
			/>

			{isOpen && currentStep ? (
				<Content
					contentKey={currentStepIndex}
					referenceElement={targetElement}
					placement={currentStep?.placement ?? placement}
				>
					<div
						data-ui="Tour-content"
						className="grid gap-2"
					>
						<div
							data-ui="Tour-header"
							className="inline-flex items-center justify-between"
						>
							{renderTitle({
								title: currentStep.title,
							})}

							<div
								data-ui="Tour-header-items"
								className="inline-flex items-center gap-2"
							>
								{renderProgress({
									isFirst,
									isLast,
									progress: currentStepIndex + 1,
									total: steps.length,
									percent:
										(100 / steps.length) *
										(currentStepIndex + 1),
								})}

								{renderClose({
									isFirst,
									isLast,
									disabled: false,
									close: handleClose,
								})}
							</div>
						</div>

						{renderDescription({
							description: currentStep.description,
						})}

						<div
							data-ui="Tour-nav"
							className={slots.nav()}
						>
							{currentStepIndex > 0
								? renderPrevButton({
										isFirst,
										isLast,
										disabled: isFirst,
										prev: goToPrevious,
									})
								: null}

							{isLast
								? renderFinishButton({
										isFirst,
										isLast,
										finish: handleClose,
									})
								: renderNextButton({
										isFirst,
										isLast,
										disabled: isLast,
										next: goToNext,
									})}
						</div>
					</div>
				</Content>
			) : null}
		</>
	);
};
