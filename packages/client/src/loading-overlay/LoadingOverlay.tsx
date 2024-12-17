import { type FC } from "react";
import { Icon } from "../icon/Icon";
import { LoadingOverlayCss } from "./LoadingOverlayCss";

export namespace LoadingOverlay {
	export interface Props extends LoadingOverlayCss.Props {
		show?: boolean;
	}
}

export const LoadingOverlay: FC<LoadingOverlay.Props> = ({
	show = true,
	variant,
	tva = LoadingOverlayCss,
	css,
}) => {
	const tv = tva({ show, ...variant, css }).slots;

	return show ?
			<div className={tv.base()}>
				<Icon
					icon={"icon-[svg-spinners--pulse-rings-multiple]"}
					variant={{ size: "8xl" }}
					css={{
						base: ["text-sky-400"],
					}}
				/>
			</div>
		:	null;
};
