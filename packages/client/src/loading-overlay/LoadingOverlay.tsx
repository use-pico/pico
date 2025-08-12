import { useCls } from "@use-pico/cls";
import type { FC } from "react";
import { Icon } from "../icon/Icon";
import { LoadingOverlayCls } from "./LoadingOverlayCls";

export namespace LoadingOverlay {
	export interface Props extends LoadingOverlayCls.Props {
		show?: boolean;
	}
}

export const LoadingOverlay: FC<LoadingOverlay.Props> = ({
	show = true,
	tva = LoadingOverlayCls,
	cls,
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			show,
		}),
	}));

	return show ? (
		<div className={slots.root()}>
			<Icon
				icon={"icon-[svg-spinners--pulse-rings-multiple]"}
				cls={({ what }) => ({
					variant: what.variant({
						size: "8xl",
					}),
					slot: what.slot({
						root: what.css([
							"text-sky-400",
						]),
					}),
				})}
			/>
		</div>
	) : null;
};
