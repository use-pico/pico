import { tvc } from "@use-pico/cls";
import { motion, useTransform } from "motion/react";
import {
	type ComponentProps,
	type FC,
	type PropsWithChildren,
	type ReactNode,
	useRef,
} from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";
import { useMergeRefs } from "../../hook/useMergeRefs";
import { Container } from "../container";
import { Tx } from "../tx";

export namespace BottomSheet {
	export namespace Header {
		export interface Props {
			close(): void;
		}

		export type RenderFn = (props: Props) => {
			title?: string;
			right?: ReactNode;
		};
	}

	export interface Props
		extends PropsWithChildren<
			Omit<ComponentProps<typeof Sheet>, "children">
		> {
		containerProps?: ComponentProps<typeof Sheet.Container>;
		contentProps?: ComponentProps<typeof Sheet.Content>;
		withHeader?: boolean;
		header?: BottomSheet.Header.RenderFn;
	}

	export type PropsEx = Omit<Props, "isOpen" | "onClose">;
}

export const BottomSheet: FC<BottomSheet.Props> = ({
	ref,
	containerProps,
	contentProps,
	withHeader = false,
	header,
	children,
	...props
}) => {
	const sheetRef = useRef<SheetRef>(null);
	const mergedRef = useMergeRefs([
		sheetRef,
		ref,
	]);
	const fade = useTransform(() => {
		const y = sheetRef.current?.y.get() ?? 0;
		const height = sheetRef.current?.height ?? 1;

		return 1 - Math.min(Math.max(y / height, 0), 1);
	});
	const $header = header?.({
		close: props.onClose,
	});

	return (
		<Sheet
			ref={mergedRef}
			data-ui={"BottomSheet[Sheet]"}
			tweenConfig={{
				ease: "easeOut",
				duration: 0.15,
			}}
			{...props}
		>
			<Sheet.Container
				data-ui={"BottomSheet-[SheetContainer]"}
				{...containerProps}
			>
				{$header ? (
					<Sheet.Header
						data-ui={"BottomSheet-[SheetHeader]"}
						unstyled
					>
						<Container
							data-ui={"BottomSheet-[Container.header-wrapper]"}
							ui={{
								tone: "neutral",
								theme: "light",
								layout: "horizontal-flex",
								items: "center",
								justify: "space-between",
								gap: "default",
								inner: "default",
								shadow: true,
							}}
						>
							{$header.title ? (
								<Tx
									label={$header.title}
									preset={"subheader"}
									ui={{
										tone: "primary",
										theme: "light",
										text: "lg",
										color: "lead",
										truncate: true,
									}}
								/>
							) : null}

							{$header.right ?? <div />}
						</Container>
					</Sheet.Header>
				) : null}

				<Sheet.Content
					data-ui={"BottomSheet-Content"}
					style={{
						position: "relative",
					}}
					{...contentProps}
				>
					{children}
				</Sheet.Content>
			</Sheet.Container>

			<motion.div
				data-ui={"BottomSheet-Backdrop"}
				className={tvc([
					"fixed",
					"top-0",
					"left-0",
					"w-full",
					"h-full",
					"touch-none",
					"bg-black/50",
					"pointer-events-auto",
					"z-1",
				])}
				style={{
					opacity: fade,
				}}
				onTap={props.onClose}
			/>
		</Sheet>
	);
};
