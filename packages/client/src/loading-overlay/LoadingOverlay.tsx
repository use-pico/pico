import { useCls } from "@use-pico/cls";
import type { FC, Ref } from "react";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { LoadingOverlayCls } from "./LoadingOverlayCls";

export namespace LoadingOverlay {
	export interface Props extends LoadingOverlayCls.Props {
		ref?: Ref<HTMLDivElement>;
		show?: boolean;
	}
}

export const LoadingOverlay: FC<LoadingOverlay.Props> = ({
	ref,
	show = true,
	cls = LoadingOverlayCls,
	tweak,
}) => {
	const { slots } = useCls(cls, [
		tweak,
		{
			variant: {
				show,
			},
		},
	]);

	return show ? (
		<div
			data-ui="LoadingOverlay-root"
			ref={ref}
			className={slots.root()}
		>
			<Icon
				icon={SpinnerIcon}
				tweak={{
					slot: {
						root: {
							class: [
								"w-24",
								"h-24",
								"text-sky-400",
							],
						},
					},
				}}
			/>
		</div>
	) : null;
};
