import type { ComponentProps, FC } from "react";
import { asOverlay } from "./asOverlay";

export namespace Overlay {
	export interface Props extends asOverlay.PropsEx<ComponentProps<"div">> {
		//
	}
}

export const Overlay: FC<Overlay.Props> = ({ type, className, ...props }) => {
	return (
		<div
			{...asOverlay({
				type,
				className,
			})}
			{...props}
		>
			<div className="Overlay-top" />
			<div className="Overlay-bottom" />
		</div>
	);
};
