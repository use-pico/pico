import { type Cls, useCls, withCls } from "@use-pico/cls";
import {
	type FC,
	type Ref,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import { useDoubleTap } from "../hooks/useDoubleTap";
import { Icon } from "../icon/Icon";
import { SnapperNavCls } from "./SnapperNavCls";
import { useSnapper } from "./useSnapper";

export namespace SnapperNav {
	export interface Page {
		id: string;
		icon: Icon.Type;
		iconProps?: Icon.PropsEx;
	}

	export interface Limit {
		limit: number;
		iconProps?: Icon.PropsEx;
	}

	export interface Props extends SnapperNavCls.Props {
		ref?: Ref<HTMLDivElement>;
		pages: Page[];
		initialIndex?: number;
		align?: Cls.VariantOf<SnapperNavCls, "align">;
		limit?: Limit;
	}
}

export const BaseSnapperNav: FC<SnapperNav.Props> = ({
	ref,
	pages,
	align,
	limit = {
		limit: 6,
		iconProps: {
			size: "sm",
		},
	},
	initialIndex = 0,
	cls = SnapperNavCls,
	tweak,
}) => {
	const { orientation, containerRef, scrollToIndex } = useSnapper();
	const [active, setActive] = useState(() =>
		Math.min(initialIndex, Math.max(0, pages.length - 1)),
	);

	const isFirst = active === 0;
	const isLast = active === pages.length - 1;

	const firstDoubleTap = useDoubleTap({
		onDoubleTap: () => scrollToIndex(0),
	});

	const lastDoubleTap = useDoubleTap({
		onDoubleTap: () => scrollToIndex(pages.length - 1),
	});

	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			orientation,
			align,
			first: isFirst,
			last: isLast,
		}),
	}));

	// Control ids (stable, unique) for start/end buttons.
	const firstId = useId();
	const lastId = useId();

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

	const flow = useMemo(() => {
		if (!limit) {
			return pages.map((_, i) => i);
		}

		const total = pages.length;
		if (total === 0) {
			return [];
		}

		const visible = Math.max(1, Math.min(limit.limit, total));
		const half = Math.floor((visible - 1) / 2);
		let start = active - half;
		start = Math.max(0, Math.min(start, total - visible));

		const out: number[] = [];
		for (let i = 0; i < visible; i++) {
			out.push(start + i);
		}
		return out;
	}, [
		limit,
		pages,
		active,
	]);

	const renderLimiter = useCallback(() => {
		const leftIcon: Icon.Type =
			orientation === "vertical"
				? "icon-[rivet-icons--chevron-up]"
				: "icon-[rivet-icons--chevron-left]";
		const rightIcon: Icon.Type =
			orientation === "vertical"
				? "icon-[rivet-icons--chevron-down]"
				: "icon-[rivet-icons--chevron-right]";

		return (
			<>
				<Icon
					id={firstId}
					key={firstId}
					onDoubleClick={() => scrollToIndex(0)}
					onClick={() => scrollToIndex(active - 1)}
					onTouchStart={firstDoubleTap.onTouchStart}
					icon={leftIcon}
					tone={orientation === "vertical" ? "secondary" : "subtle"}
					size="md"
					tweak={({ what }) => ({
						slot: what.slot({
							root: what.css(slots.first()),
						}),
					})}
					{...limit?.iconProps}
				/>
				{flow.map((i) => {
					const page = pages[i];
					/**
					 * Just to make TS happy
					 */
					if (!page) {
						return null;
					}
					const isActive = i === active;

					return (
						<Icon
							id={page.id}
							key={page.id}
							onClick={() => scrollToIndex(i)}
							icon={page.icon}
							tone={
								orientation === "vertical"
									? "secondary"
									: "subtle"
							}
							size="md"
							tweak={({ what }) => ({
								slot: what.slot({
									root: what.css(
										slots.item(({ what }) => ({
											variant: what.variant({
												active: isActive,
											}),
										})),
									),
								}),
							})}
							{...page.iconProps}
						/>
					);
				})}
				<Icon
					id={lastId}
					key={lastId}
					onClick={() => scrollToIndex(active + 1)}
					onDoubleClick={() => scrollToIndex(pages.length - 1)}
					onTouchStart={lastDoubleTap.onTouchStart}
					icon={rightIcon}
					tone={orientation === "vertical" ? "secondary" : "subtle"}
					size="md"
					tweak={({ what }) => ({
						slot: what.slot({
							root: what.css(slots.last()),
						}),
					})}
					{...limit?.iconProps}
				/>
			</>
		);
	}, [
		firstId,
		lastId,
		orientation,
		limit?.iconProps,
		pages,
		active,
		flow,
		scrollToIndex,
		slots,
		firstDoubleTap,
		lastDoubleTap,
	]);

	const renderPages = useCallback(
		() => (
			<>
				{pages.map((page, i) => {
					const isActive = i === active;

					return (
						<Icon
							id={page.id}
							key={page.id}
							onClick={() => scrollToIndex(i)}
							icon={page.icon}
							tone={
								orientation === "vertical"
									? "secondary"
									: "subtle"
							}
							size="md"
							tweak={({ what }) => ({
								slot: what.slot({
									root: what.css([
										"pointer-events-auto select-none transition cursor-pointer",
										isActive
											? "scale-125 opacity-100"
											: "opacity-60 hover:opacity-90",
									]),
								}),
							})}
							{...page.iconProps}
						/>
					);
				})}
			</>
		),
		[
			orientation,
			pages,
			active,
			scrollToIndex,
		],
	);

	return (
		<div
			data-ui="SnapperNav-root"
			ref={ref}
			className={slots.root()}
		>
			<div
				data-ui="SnapperNav-items"
				className={slots.items()}
			>
				{limit ? renderLimiter() : renderPages()}
			</div>
		</div>
	);
};

export const SnapperNav = withCls(BaseSnapperNav, SnapperNavCls);
