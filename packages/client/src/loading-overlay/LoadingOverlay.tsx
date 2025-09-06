import { useCls } from "@use-pico/cls";
import type { FC } from "react";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { LoadingOverlayCls } from "./LoadingOverlayCls";

export namespace LoadingOverlay {
	export interface Props extends LoadingOverlayCls.Props {
		show?: boolean;
	}
}

export const LoadingOverlay: FC<LoadingOverlay.Props> = ({
	show = true,
	cls = LoadingOverlayCls,
	tweak,
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			show,
		}),
	}));

	return show ? (
		<div className={slots.root()}>
			<Icon
				icon={SpinnerIcon}
				tweak={({ what }) => ({
					slot: what.slot({
						root: what.css([
							"w-24",
							"h-24",
							"text-sky-400",
						]),
					}),
				})}
			/>
		</div>
	) : null;
};
