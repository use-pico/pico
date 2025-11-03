import { type Cls, useCls, VariantProvider } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode, Ref } from "react";
import { PicoCls } from "../../cls/PicoCls";
import { Icon } from "../../icon/Icon";
import type { IconCls } from "../../icon/IconCls";
import type { UiProps } from "../../type/UiProps";
import { Tx } from "../tx/Tx";
import type { Typo } from "../typo/Typo";
import { StatusCls } from "./StatusCls";

export namespace Status {
	export interface Props extends UiProps<StatusCls.Props<PropsWithChildren>> {
		ref?: Ref<HTMLDivElement>;
		/**
		 * Translation key for the title text.
		 */
		textTitle?: string;
		/**
		 * Translation key for the message text.
		 */
		textMessage?: string;
		/**
		 * Optional action section (e.g., buttons)
		 */
		action?: ReactNode;
		icon?: Icon.Type;
		iconProps?: Icon.PropsEx;
		titleProps?: Typo.PropsEx;
		messageProps?: Typo.PropsEx;
		tone?: Cls.VariantOf<IconCls, "tone">;
		theme?: Cls.VariantOf<IconCls, "theme">;
	}
}

export const Status: FC<Status.Props> = ({
	ref,
	ui,
	textTitle,
	textMessage,
	action,
	icon,
	iconProps,
	titleProps,
	messageProps,
	tone,
	theme,
	cls = StatusCls,
	tweak,
	children,
}) => {
	const { slots, variant } = useCls(cls, tweak, {
		variant: {
			tone,
			theme,
		},
	});

	return (
		<VariantProvider
			cls={PicoCls}
			variant={{
				tone: variant.tone,
				theme: variant.theme,
			}}
		>
			<div
				data-ui={ui ?? "Status-root"}
				ref={ref}
				className={slots.root()}
			>
				<div
					data-ui="Status-title"
					className={slots.title()}
				>
					<Icon
						icon={icon}
						size="xl"
						tweak={{
							slot: {
								root: {
									class: [
										"opacity-50",
									],
								},
							},
						}}
						{...iconProps}
					/>

					<Tx
						label={textTitle}
						size="xl"
						font="bold"
						display="block"
						wrap={"wrap"}
						{...titleProps}
					/>
					<Tx
						label={textMessage}
						display="block"
						wrap={"wrap"}
						{...messageProps}
					/>
				</div>

				{action && (
					<div
						data-ui="Status-action"
						className={slots.action()}
					>
						{action}
					</div>
				)}

				{children ? (
					<div
						data-ui="Status-body"
						className={slots.body()}
					>
						{children}
					</div>
				) : null}
			</div>
		</VariantProvider>
	);
};
