import { type Cls, tvc, useCls, withCls } from "@use-pico/cls";
import type { FC } from "react";
import { OverlayCls } from "./OverlayCls";

export namespace Overlay {
	export interface Props extends OverlayCls.Props {
		opacity?: Cls.VariantOf<OverlayCls, "opacity">;
		type?: Cls.VariantOf<OverlayCls, "type">;
		accentFrom?: Cls.VariantOf<OverlayCls, "accent-from">;
		accentTo?: Cls.VariantOf<OverlayCls, "accent-to">;
	}
}

export const BaseOverlay: FC<Overlay.Props> = ({
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
		<div className={tvc(slots.root())}>
			<div className={tvc(slots.top())} />
			<div className={tvc(slots.bottom())} />
		</div>
	);
};

export const Overlay = withCls(BaseOverlay, OverlayCls);
