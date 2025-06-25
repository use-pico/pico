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
	variant,
	tva = LoadingOverlayCls,
	css,
}) => {
	const { slots } = tva({
		show,
		...variant,
		css,
	});

	return show ? (
		<div className={slots.base()}>
			<Icon
				icon={"icon-[svg-spinners--pulse-rings-multiple]"}
				variant={{
					size: "8xl",
				}}
				css={{
					base: [
						"text-sky-400",
					],
				}}
			/>
		</div>
	) : null;
};
