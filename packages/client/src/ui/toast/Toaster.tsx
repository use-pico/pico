import { type Cls, useCls } from "@use-pico/cls";
import { type FC, useId, useRef } from "react";
import { ToasterCls } from "./ToasterCls";
import { ToastItem } from "./ToastItem";
import { useToastContext } from "./useToastContext";

export namespace Toaster {
	export interface Props extends ToasterCls.Props {
		/**
		 * The position of the toaster
		 */
		position: Cls.VariantOf<ToasterCls, "position">;
	}
}

export const Toaster: FC<Toaster.Props> = ({
	position,
	cls = ToasterCls,
	tweak,
}) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const toastId = useId();

	const { slots } = useCls(cls, tweak, {
		variant: {
			position,
		},
	});

	const useToastStore = useToastContext();
	useToastStore();
	const getVisible = useToastStore((state) => state.getVisible);

	return (
		<div
			ref={rootRef}
			className={slots.root()}
		>
			{getVisible(position).map((toast, i) => {
				return (
					<ToastItem
						key={`${toastId}-${toast.id}-${i}`}
						slots={slots}
						position={position}
						toast={toast}
					/>
				);
			})}
		</div>
	);
};
