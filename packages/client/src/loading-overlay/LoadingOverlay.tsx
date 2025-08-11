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
	const classes = tva.create(cls, ({ what }) => ({
		variant: what.variant({
			show,
		}),
	}));

	return show ? (
		<div className={classes.base()}>
			<Icon
				icon={"icon-[svg-spinners--pulse-rings-multiple]"}
				cls={({ what }) => ({
					variant: what.variant({
						size: "8xl",
					}),
					slot: {
						base: what.css([
							"text-sky-400",
						]),
					},
				})}
			/>
		</div>
	) : null;
};
