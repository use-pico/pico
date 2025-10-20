import { type Cls, useCls } from "@use-pico/cls";
import { type FC, type Ref, useCallback, useId, useMemo } from "react";
import { useDoubleTap } from "../hook/useDoubleTap";
import { DotIcon } from "../icon/DotIcon";
import { Icon } from "../icon/Icon";
import type { IconCls } from "../icon/IconCls";
import { SnapperNavCls } from "./SnapperNavCls";
import type { useSnapperNav } from "./useSnapperNav";

export namespace SnapperNav {
	export namespace IconProps {
		export interface Props {
			limit: boolean;
			active: boolean | undefined;
			index: number | undefined;
		}

		export type IconPropsFn = (props: Props) => Icon.PropsEx;
	}

	export interface Page {
		id: string;
		icon: Icon.Type;
		/**
		 * Overrides the default icon props for the given page.
		 *
		 * Keep in mind this affects only pages, not the limiter (edges).
		 */
		iconProps?: IconProps.IconPropsFn;
	}

	export interface Count {
		count: number;
		icon?: Icon.Type;
	}

	export interface Props extends SnapperNavCls.Props {
		ref?: Ref<HTMLDivElement>;
		snapperNav: useSnapperNav.Result;
		pages?: Page[] | Count;
		subtle?: boolean;
		orientation: Cls.VariantOf<SnapperNavCls, "orientation">;
		tone?: Cls.VariantOf<IconCls, "tone">;
		align?: Cls.VariantOf<SnapperNavCls, "align">;
		iconProps?: IconProps.IconPropsFn;
		limit?: number;
	}
}

export const SnapperNav: FC<SnapperNav.Props> = ({
	ref,
	snapperNav,
	pages,
	//
	subtle,
	orientation,
	tone = "secondary",
	align,
	//
	iconProps,
	limit = 5,
	//
	cls = SnapperNavCls,
	tweak,
	//
}) => {
	const pageId = useId();
	const $pages: SnapperNav.Page[] = pages
		? Array.isArray(pages)
			? pages
			: Array.from(
					{
						length: pages.count,
					},
					(_, i) => ({
						id: `${pageId}-${i}`,
						icon: pages.icon ?? DotIcon,
					}),
				)
		: Array.from(
				{
					length: snapperNav.state.count,
				},
				(_, i) => ({
					id: `${pageId}-${i}`,
					icon: DotIcon,
				}),
			);

	const { slots } = useCls(cls, tweak, {
		variant: {
			orientation,
			align,
			subtle,
			first: snapperNav.state.isFirst,
			last: snapperNav.state.isLast,
		},
	});

	const firstDoubleTap = useDoubleTap({
		onDoubleTap: snapperNav.api.start,
	});

	const lastDoubleTap = useDoubleTap({
		onDoubleTap: snapperNav.api.end,
	});

	// Control ids (stable, unique) for start/end buttons.
	const firstId = useId();
	const lastId = useId();

	const flow = useMemo(() => {
		if (!limit) {
			return $pages.map((_, i) => i);
		}

		const total = $pages.length;
		if (total === 0) {
			return [];
		}

		const visible = Math.max(1, Math.min(limit, total));
		const half = Math.floor((visible - 1) / 2);
		let start = snapperNav.state.current - half;
		start = Math.max(0, Math.min(start, total - visible));

		const out: number[] = [];
		for (let i = 0; i < visible; i++) {
			out.push(start + i);
		}
		return out;
	}, [
		limit,
		$pages,
		snapperNav.state.current,
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
					onDoubleClick={snapperNav.api.start}
					onClick={snapperNav.api.prev}
					onTouchStart={firstDoubleTap.onTouchStart}
					icon={leftIcon}
					tone={tone}
					size="md"
					tweak={{
						slot: {
							root: {
								class: slots.first(),
							},
						},
					}}
					{...iconProps?.({
						limit: true,
						active: false,
						index: undefined,
					})}
				/>
				{flow.map((i) => {
					const page = $pages[i];
					/**
					 * Just to make TS happy
					 */
					if (!page) {
						return null;
					}
					const isActive = i === snapperNav.state.current;

					return (
						<Icon
							id={page.id}
							key={page.id}
							onClick={() => snapperNav.api.snapTo(i)}
							icon={page.icon}
							tone={tone}
							size="md"
							tweak={{
								slot: {
									root: {
										class: slots.item({
											variant: {
												active: isActive,
											},
										}),
									},
								},
							}}
							{...iconProps?.({
								limit: false,
								active: isActive,
								index: i,
							})}
							{...page.iconProps?.({
								limit: false,
								active: isActive,
								index: i,
							})}
						/>
					);
				})}
				<Icon
					id={lastId}
					key={lastId}
					onClick={snapperNav.api.next}
					onDoubleClick={snapperNav.api.end}
					onTouchStart={lastDoubleTap.onTouchStart}
					icon={rightIcon}
					tone={tone}
					size="md"
					tweak={{
						slot: {
							root: {
								class: slots.last(),
							},
						},
					}}
					{...iconProps?.({
						limit: true,
						active: false,
						index: undefined,
					})}
				/>
			</>
		);
	}, [
		firstId,
		lastId,
		orientation,
		tone,
		iconProps,
		$pages,
		snapperNav,
		flow,
		slots,
		firstDoubleTap,
		lastDoubleTap,
	]);

	const renderPages = useCallback(
		() => (
			<>
				{$pages.map((page, i) => {
					const isActive = i === snapperNav.state.current;

					return (
						<Icon
							id={page.id}
							key={page.id}
							onClick={() => snapperNav.api.snapTo(i)}
							icon={page.icon}
							tone={tone}
							size="md"
							tweak={{
								slot: {
									root: {
										class: [
											"pointer-events-auto select-none transition cursor-pointer",
											isActive
												? "scale-125 opacity-100"
												: "opacity-60 hover:opacity-90",
										],
									},
								},
							}}
							{...iconProps?.({
								limit: false,
								active: isActive,
								index: i,
							})}
						/>
					);
				})}
			</>
		),
		[
			tone,
			$pages,
			iconProps,
			snapperNav,
		],
	);

	return snapperNav.state.count > 1 ? (
		<div
			data-ui="SnapperNav-root"
			ref={ref}
			className={slots.root()}
		>
			<div
				data-ui="SnapperNav-items"
				className={slots.items()}
			>
				{limit && $pages.length > limit
					? renderLimiter()
					: renderPages()}
			</div>
		</div>
	) : null;
};
