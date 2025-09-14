import type { Placement } from "@floating-ui/react";
import { useCls } from "@use-pico/cls";
import { type FC, useCallback, useEffect, useState } from "react";
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

	export interface Props extends TourCls.Props {
		steps: Step[];
		isOpen: boolean;
		initialStepIndex?: number;
		placement?: Placement;
		onClose?: () => void;
	}
}

export const Tour: FC<Tour.Props> = ({
	steps,
	isOpen,
	initialStepIndex = 0,
	placement = "bottom",
	onClose,
	cls = TourCls,
	tweak,
}) => {
	const slots = useCls(cls, tweak);
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
					<div className="grid gap-2">
						<div className="inline-flex items-center justify-between">
							<div>{currentStep.title}</div>

							<div className="inline-flex items-center gap-2">
								<Typo
									label={`${currentStepIndex + 1} / ${steps.length}`}
									font={"bold"}
									size={"sm"}
									tone={"primary"}
									theme={"light"}
								/>

								<Action
									iconEnabled={CloseIcon}
									iconDisabled={CloseIcon}
									onClick={handleClose}
									size="sm"
									tone={"neutral"}
									theme={"light"}
								/>
							</div>
						</div>

						<Typo
							label={currentStep.description}
							size="sm"
							tone={"secondary"}
							theme={"light"}
						/>

						<div className={slots.nav()}>
							{currentStepIndex > 0 ? (
								<Button
									iconEnabled={ArrowLeftIcon}
									iconDisabled={ArrowLeftIcon}
									onClick={goToPrevious}
									size="sm"
								>
									<Tx label={"Previous (tour)"} />
								</Button>
							) : null}

							{isLast ? (
								<Button
									onClick={goToNext}
									size="sm"
									tone="warning"
								>
									<Tx label={"Finish (tour)"} />
								</Button>
							) : (
								<Button
									iconEnabled={ArrowRightIcon}
									iconDisabled={ArrowRightIcon}
									onClick={goToNext}
									size="sm"
								>
									<Tx label={"Next (tour)"} />
								</Button>
							)}
						</div>
					</div>
				</Content>
			) : null}
		</>
	);
};
