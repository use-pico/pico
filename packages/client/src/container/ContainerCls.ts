import { PicoCls } from "@use-pico/client";
import type { Cls } from "@use-pico/cls";

export const ContainerCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			height: [
				"full",
				"dvh",
				"auto",
			],
			width: [
				"full",
				"dvw",
				"auto",
			],
			orientation: [
				"unset",
				"vertical",
				"vertical-full",
				"horizontal",
				"horizontal-full",
			],
			overflow: [
				"unset",
				"horizontal",
				"vertical",
			],
			snap: [
				"unset",
				"horizontal-start",
				"horizontal-center",
				"horizontal-end",
				"vertical-start",
				"vertical-center",
				"vertical-end",
			],
			item: [
				"unset",
				"col",
				"row",
				"full",
			],
			square: [
				"unset",
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
			],
			gap: [
				"unset",
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
			],
			position: [
				"unset",
				"absolute",
				"relative",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			/**
			 * Height
			 */
			def.rule(
				what.variant({
					height: "full",
				}),
				{
					root: what.css([
						"Container-root-height[full]",
						"h-full",
						"min-h-0",
						"max-h-full",
					]),
				},
			),
			def.rule(
				what.variant({
					height: "dvh",
				}),
				{
					root: what.css([
						"Container-root-height[dvh]",
						"h-dvh",
						"min-h-dvh",
						"w-full",
					]),
				},
			),
			def.rule(
				what.variant({
					height: "auto",
				}),
				{
					root: what.css([
						"Container-root-height[auto]",
						"h-auto",
						"min-h-0",
						"w-full",
					]),
				},
			),
			/**
			 * Width
			 */
			def.rule(
				what.variant({
					width: "full",
				}),
				{
					root: what.css([
						"Container-root-width[full]",
						"w-full",
						"min-w-0",
						"max-w-full",
					]),
				},
			),
			def.rule(
				what.variant({
					width: "dvw",
				}),
				{
					root: what.css([
						"Container-root-width[dvw]",
						"w-dvw",
						"min-w-dvw",
					]),
				},
			),
			def.rule(
				what.variant({
					width: "auto",
				}),
				{
					root: what.css([
						"Container-root-width[auto]",
						"w-auto",
						"min-w-0",
						"h-full",
					]),
				},
			),

			/**
			 * Orientation
			 */
			def.rule(
				what.variant({
					orientation: "horizontal",
				}),
				{
					root: what.css([
						"Container-root-orientation[horizontal]",
						"grid",
						"grid-flow-col",
						"auto-cols-auto",
						"grid-rows-1",
					]),
				},
			),
			def.rule(
				what.variant({
					orientation: "horizontal-full",
				}),
				{
					root: what.css([
						"Container-root-orientation[horizontal-full]",
						"grid",
						"grid-flow-col",
						"grid-rows-1",
						"auto-cols-[100%]",
						"w-full",
						"h-full",
						"min-w-0",
						"min-h-0",
					]),
				},
			),
			def.rule(
				what.variant({
					orientation: "vertical",
				}),
				{
					root: what.css([
						"Container-root-orientation[vertical]",
						"grid",
						"grid-flow-row",
						"auto-rows-auto",
						"grid-cols-1",
					]),
				},
			),
			def.rule(
				what.variant({
					orientation: "vertical-full",
				}),
				{
					root: what.css([
						"Container-root-orientation[vertical-full]",
						"grid",
						"grid-flow-row",
						"grid-cols-1",
						"auto-rows-[100%]",
						"w-full",
						"h-full",
						"min-w-0",
						"min-h-0",
					]),
				},
			),

			/**
			 * Overflow (simplified)
			 */
			def.rule(
				what.variant({
					overflow: "horizontal",
				}),
				{
					root: what.css([
						"Container-root-overflow[horizontal]",
						"isolate",
						"overflow-x-auto",
						"overflow-y-clip",
						"[scrollbar-gutter:stable_both-edges]",
					]),
				},
			),
			def.rule(
				what.variant({
					overflow: "vertical",
				}),
				{
					root: what.css([
						"Container-root-overflow[vertical]",
						"isolate",
						"overflow-y-auto",
						"overflow-x-clip",
						"[scrollbar-gutter:stable_both-edges]",
					]),
				},
			),

			// X axis
			def.rule(
				what.variant({
					snap: "horizontal-start",
				}),
				{
					root: what.css([
						"Container-root-snap[horizontal-start]",
						"isolate",
						"overflow-x-auto",
						"overflow-y-clip",
						"snap-x",
						"snap-mandatory",
						"[&>*]:snap-start",
					]),
				},
			),
			def.rule(
				what.variant({
					snap: "horizontal-center",
				}),
				{
					root: what.css([
						"Container-root-snap[horizontal-center]",
						"isolate",
						"overflow-x-auto",
						"overflow-y-clip",
						"snap-x",
						"snap-mandatory",
						"[&>*]:snap-center",
					]),
				},
			),
			def.rule(
				what.variant({
					snap: "horizontal-end",
				}),
				{
					root: what.css([
						"Container-root-snap[horizontal-end]",
						"isolate",
						"overflow-x-auto",
						"overflow-y-clip",
						"snap-x",
						"snap-mandatory",
						"[&>*]:snap-end",
					]),
				},
			),
			// Y axis
			def.rule(
				what.variant({
					snap: "vertical-start",
				}),
				{
					root: what.css([
						"Container-root-snap[vertical-start]",
						"isolate",
						"overflow-y-auto",
						"overflow-x-clip",
						"snap-y",
						"snap-mandatory",
						"[&>*]:snap-start",
					]),
				},
			),
			def.rule(
				what.variant({
					snap: "vertical-center",
				}),
				{
					root: what.css([
						"Container-root-snap[vertical-center]",
						"isolate",
						"overflow-y-auto",
						"overflow-x-clip",
						"snap-y",
						"snap-mandatory",
						"[&>*]:snap-center",
					]),
				},
			),
			def.rule(
				what.variant({
					snap: "vertical-end",
				}),
				{
					root: what.css([
						"Container-root-snap[vertical-end]",
						"isolate",
						"overflow-y-auto",
						"overflow-x-clip",
						"snap-y",
						"snap-mandatory",
						"[&>*]:snap-end",
					]),
				},
			),

			/**
			 * Items (helper presety)
			 */
			def.rule(
				what.variant({
					item: "col",
				}),
				{
					root: what.css([
						"Container-root-item[col]",
						"h-full",
						"w-auto",
						"min-w-0",
						"min-h-0",
					]),
				},
			),
			def.rule(
				what.variant({
					item: "row",
				}),
				{
					root: what.css([
						"Container-root-item[row]",
						"w-full",
						"h-auto",
						"min-h-0",
						"min-w-0",
					]),
				},
			),
			def.rule(
				what.variant({
					item: "full",
				}),
				{
					root: what.css([
						"Container-root-item[full]",
						"w-full",
						"h-full",
						"min-w-0",
						"min-h-0",
					]),
				},
			),

			/**
			 * Square - paddings
			 */
			def.rule(
				what.variant({
					square: "xs",
				}),
				{
					root: what.both(
						[
							"Container-root-square[xs]",
						],
						[
							"square.xs",
						],
					),
				},
			),
			def.rule(
				what.variant({
					square: "sm",
				}),
				{
					root: what.both(
						[
							"Container-root-square[sm]",
						],
						[
							"square.sm",
						],
					),
				},
			),
			def.rule(
				what.variant({
					square: "md",
				}),
				{
					root: what.both(
						[
							"Container-root-square[md]",
						],
						[
							"square.md",
						],
					),
				},
			),
			def.rule(
				what.variant({
					square: "lg",
				}),
				{
					root: what.both(
						[
							"Container-root-square[lg]",
						],
						[
							"square.lg",
						],
					),
				},
			),
			def.rule(
				what.variant({
					square: "xl",
				}),
				{
					root: what.both(
						[
							"Container-root-square[xl]",
						],
						[
							"square.xl",
						],
					),
				},
			),
			/**
			 * Gaps
			 */
			def.rule(
				what.variant({
					gap: "xs",
				}),
				{
					root: what.css([
						"Container-root-gap[xs]",
						"gap-1",
					]),
				},
			),
			def.rule(
				what.variant({
					gap: "sm",
				}),
				{
					root: what.css([
						"Container-root-gap[sm]",
						"gap-2",
					]),
				},
			),
			def.rule(
				what.variant({
					gap: "md",
				}),
				{
					root: what.css([
						"Container-root-gap[md]",
						"gap-3",
					]),
				},
			),
			def.rule(
				what.variant({
					gap: "lg",
				}),
				{
					root: what.css([
						"Container-root-gap[lg]",
						"gap-4",
					]),
				},
			),
			def.rule(
				what.variant({
					gap: "xl",
				}),
				{
					root: what.css([
						"Container-root-gap[xl]",
						"gap-5",
					]),
				},
			),
			/**
			 * Position
			 */
			def.rule(
				what.variant({
					position: "absolute",
				}),
				{
					root: what.css([
						"Container-root-position[absolute]",
						"absolute",
					]),
				},
			),
			def.rule(
				what.variant({
					position: "relative",
				}),
				{
					root: what.css([
						"Container-root-position[relative]",
						"relative",
					]),
				},
			),
		],
		defaults: def.defaults({
			height: "full",
			width: "full",
			orientation: "unset",
			overflow: "unset",
			snap: "unset",
			item: "unset",
			square: "unset",
			gap: "unset",
			position: "unset",
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type ContainerCls = typeof ContainerCls;

export namespace ContainerCls {
	export type Props<P = unknown> = Cls.Props<ContainerCls, P>;
}
