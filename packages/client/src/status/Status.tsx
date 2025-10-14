import { type Cls, useCls, VariantProvider, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode, Ref } from "react";
import { PicoCls } from "../cls/PicoCls";
import { Icon } from "../icon/Icon";
import type { IconCls } from "../icon/IconCls";
import { Typo } from "../typo/Typo";
import { StatusCls } from "./StatusCls";

export namespace Status {
	export interface Props extends StatusCls.Props<PropsWithChildren> {
		ref?: Ref<HTMLDivElement>;
		textTitle: ReactNode;
		textMessage?: ReactNode;
		icon?: Icon.Type;
		iconProps?: Icon.PropsEx;
		titleProps?: Typo.PropsEx;
		messageProps?: Typo.PropsEx;
		tone?: Cls.VariantOf<IconCls, "tone">;
		theme?: Cls.VariantOf<IconCls, "theme">;
	}
}

const BaseStatus: FC<Status.Props> = ({
	ref,
	textTitle,
	textMessage,
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
				data-ui="Status-root"
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

					<Typo
						label={textTitle}
						size="xl"
						font="bold"
						display="block"
						{...titleProps}
					/>
					<Typo
						label={textMessage}
						display="block"
						{...messageProps}
					/>
				</div>

				<div
					data-ui="Status-body"
					className={slots.body()}
				>
					<VariantProvider
						cls={PicoCls}
						variant={{}}
					>
						{children}
					</VariantProvider>
				</div>
			</div>
		</VariantProvider>
	);
};
export const Status = withCls(BaseStatus, StatusCls);
