import { type Cls, useCls, withCls } from "@use-pico/cls";
import { type FC, useEffect, useState } from "react";
import { Icon } from "../icon/Icon";
import { SnapperNavCls } from "./SnapperNavCls";
import { useSnapper } from "./useSnapper";

export namespace SnapperNav {
	export interface Page {
		id: string;
		icon: Icon.Type;
		iconProps?: Icon.PropsEx;
	}

	export interface Props extends SnapperNavCls.Props {
		pages: Page[];
		initialIndex?: number;
		align?: Cls.VariantOf<SnapperNavCls, "align">;
	}
}

export const BaseSnapperNav: FC<SnapperNav.Props> = ({
	pages,
	align,
	initialIndex = 0,
	cls = SnapperNavCls,
	tweak,
}) => {
	const { orientation, containerRef, scrollToIndex } = useSnapper();
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			orientation,
			align,
		}),
	}));
	const [active, setActive] = useState(() =>
		Math.min(initialIndex, Math.max(0, pages.length - 1)),
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Intentional - one shot execution
	useEffect(() => {
		scrollToIndex(active, "auto");
	}, []);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}

		const onScroll = () => {
			const size =
				orientation === "vertical" ? el.clientHeight : el.clientWidth;
			const pos =
				orientation === "vertical" ? el.scrollTop : el.scrollLeft;
			const idx = Math.max(
				0,
				Math.min(pages.length - 1, Math.round(pos / Math.max(1, size))),
			);
			if (idx !== active) {
				setActive(idx);
			}
		};

		el.addEventListener("scroll", onScroll, {
			passive: true,
		});
		return () => el.removeEventListener("scroll", onScroll);
	}, [
		containerRef,
		orientation,
		pages,
		active,
	]);

	return (
		<div className={slots.root()}>
			<div className={slots.items()}>
				{pages.map(({ id, icon, iconProps }, i) => {
					const isActive = i === active;
					return (
						<Icon
							id={id}
							key={id}
							onClick={() => scrollToIndex(i)}
							icon={icon}
							tone={
								orientation === "vertical"
									? "secondary"
									: "subtle"
							}
							size="md"
							tweak={({ what }) => ({
								slot: what.slot({
									root: what.css([
										"pointer-events-auto select-none transition",
										isActive
											? "scale-125 opacity-100"
											: "opacity-60 hover:opacity-90",
									]),
								}),
							})}
							{...iconProps}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const SnapperNav = withCls(BaseSnapperNav, SnapperNavCls);
