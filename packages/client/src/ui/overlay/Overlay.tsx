import { type Cls, tvc, useCls } from "@use-pico/cls";
import type { FC } from "react";
import type { UiProps } from "../../type/UiProps";
import { OverlayCls } from "./OverlayCls";

export namespace Overlay {
	export interface Props extends UiProps<OverlayCls.Props> {
		opacity?: Cls.VariantOf<OverlayCls, "opacity">;
		type?: Cls.VariantOf<OverlayCls, "type">;
		accentFrom?: Cls.VariantOf<OverlayCls, "accent-from">;
		accentTo?: Cls.VariantOf<OverlayCls, "accent-to">;
	}
}

export const Overlay: FC<Overlay.Props> = ({
	ui,
	opacity,
	type,
	accentFrom,
	accentTo,
	cls = OverlayCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			"accent-from": accentFrom,
			"accent-to": accentTo,
			opacity,
			type,
		},
	});

	return (
		<div
			data-ui={ui ?? "Overlay-root"}
			className={tvc(slots.root())}
		>
			<div className={tvc(slots.top())} />
			<div className={tvc(slots.bottom())} />
		</div>
	);
};
