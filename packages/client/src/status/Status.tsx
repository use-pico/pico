import { type Cls, useClsEx, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode, Ref } from "react";
import { Icon } from "../icon/Icon";
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
		tone?: Cls.VariantOf<StatusCls, "tone">;
	}
}

export const BaseStatus: FC<Status.Props> = ({
	ref,
	textTitle,
	textMessage,
	icon,
	iconProps,
	titleProps,
	messageProps,
	tone = "inherit",
	cls = StatusCls,
	tweak,
	children,
}) => {
	const { slots, variants } = useClsEx(cls, tweak, ({ what }) => ({
		variant: what.variant({
			tone,
		}),
	}));

	return (
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
					tone={variants.tone}
					tweak={({ what }) => ({
						slot: what.slot({
							root: what.css([
								"opacity-50",
							]),
						}),
					})}
					{...iconProps}
				/>

				<Typo
					label={textTitle}
					size="xl"
					font="bold"
					tone={variants.tone}
					{...titleProps}
				/>
				<Typo
					label={textMessage}
					tone={variants.tone}
					{...messageProps}
				/>
			</div>

			<div
				data-ui="Status-body"
				className={slots.body()}
			>
				{children}
			</div>
		</div>
	);
};

export const Status = withCls(BaseStatus, StatusCls);
