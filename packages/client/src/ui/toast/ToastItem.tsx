import type { Cls } from "@use-pico/cls";
import { type FC, useMemo, useRef } from "react";
import { anim, useAnim } from "../../gsap/gsap";
import type { Toast } from "./Toast";
import type { ToasterCls } from "./ToasterCls";
import { useToastContext } from "./useToastContext";

export namespace ToastItem {
	export interface Props {
		slots: Cls.SlotsOf<ToasterCls>;
		position: Cls.VariantOf<ToasterCls, "position">;
		toast: Toast;
	}
}

export const ToastItem: FC<ToastItem.Props> = ({ slots, position, toast }) => {
	const useToastStore = useToastContext();
	const durationMs = useToastStore((state) => state.durationMs);
	const dismiss = useToastStore((state) => state.dismiss);
	const pull = useToastStore((state) => state.pull);
	const rootRef = useRef<HTMLDivElement>(null);

	const isBottom = useMemo(
		() =>
			[
				"bottom-left",
				"bottom-center",
				"bottom-right",
			].includes(String(position)),
		[
			position,
		],
	);

	useAnim(
		() => {
			anim.timeline({})
				.fromTo(
					rootRef.current,
					{
						opacity: 0,
						y: isBottom ? 12 : -12,
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.22,
						ease: "power2.out",
						clearProps: "transform",
						stagger: 0.06,
					},
				)
				.to(rootRef.current, {
					delay: durationMs / 1000,
					opacity: 0,
					y: isBottom ? -12 : 12,
					duration: 0.75,
					ease: "power2.out",
					clearProps: "transform",
					onComplete() {
						dismiss(toast.id);
						pull();
					},
				});
		},
		{
			scope: rootRef,
			dependencies: [
				isBottom,
			],
		},
	);

	return (
		<div
			ref={rootRef}
			className={slots.item()}
			data-toast-id={toast.id}
		>
			{toast.render({
				toast,
			})}
		</div>
	);
};
