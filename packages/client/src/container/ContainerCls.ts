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
			border: [
				"unset",
				"default",
				"sm",
				"md",
				"lg",
				"xl",
			],
			round: [
				"unset",
				"default",
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
				"full",
			],
			shadow: [
				"unset",
				"default",
				"sm",
				"md",
				"lg",
				"xl",
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
			/**
			 * Tone and Theme rules (colors only) - no "unset" rules
			 */
			def.rule(
				what.variant({
					tone: "primary",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.primary.light.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
						"tone.primary.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "primary",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.primary.dark.text",
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
						"tone.primary.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.secondary.light.text",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
						"tone.secondary.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.secondary.dark.text",
						"tone.secondary.dark.bg",
						"tone.secondary.dark.border",
						"tone.secondary.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.danger.light.text",
						"tone.danger.light.bg",
						"tone.danger.light.border",
						"tone.danger.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.danger.dark.text",
						"tone.danger.dark.bg",
						"tone.danger.dark.border",
						"tone.danger.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.warning.light.text",
						"tone.warning.light.bg",
						"tone.warning.light.border",
						"tone.warning.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.warning.dark.text",
						"tone.warning.dark.bg",
						"tone.warning.dark.border",
						"tone.warning.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.neutral.light.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
						"tone.neutral.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.neutral.dark.text",
						"tone.neutral.dark.bg",
						"tone.neutral.dark.border",
						"tone.neutral.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.subtle.light.text",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
						"tone.subtle.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.subtle.dark.text",
						"tone.subtle.dark.bg",
						"tone.subtle.dark.border",
						"tone.subtle.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "link",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.link.light.text",
						"tone.link.light.bg",
						"tone.link.light.border",
						"tone.link.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "link",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.link.dark.text",
						"tone.link.dark.bg",
						"tone.link.dark.border",
						"tone.link.dark.shadow",
					]),
				},
			),
			/**
			 * Border rules (size only, no colors)
			 */
			def.rule(
				what.variant({
					border: "default",
				}),
				{
					root: what.token([
						"border.default",
					]),
				},
			),
			def.rule(
				what.variant({
					border: "sm",
				}),
				{
					root: what.token([
						"border.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					border: "md",
				}),
				{
					root: what.token([
						"border.md",
					]),
				},
			),
			def.rule(
				what.variant({
					border: "lg",
				}),
				{
					root: what.token([
						"border.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					border: "xl",
				}),
				{
					root: what.token([
						"border.xl",
					]),
				},
			),
			/**
			 * Shadow rules (size only, no colors)
			 */
			def.rule(
				what.variant({
					shadow: "default",
				}),
				{
					root: what.token([
						"shadow.default",
					]),
				},
			),
			def.rule(
				what.variant({
					shadow: "sm",
				}),
				{
					root: what.token([
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					shadow: "md",
				}),
				{
					root: what.token([
						"shadow.md",
					]),
				},
			),
			def.rule(
				what.variant({
					shadow: "lg",
				}),
				{
					root: what.token([
						"shadow.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					shadow: "xl",
				}),
				{
					root: what.token([
						"shadow.xl",
					]),
				},
			),
			/**
			 * Rounded corners - using PicoCls round tokens
			 */
			def.rule(
				what.variant({
					round: "default",
				}),
				{
					root: what.token([
						"round.default",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "xs",
				}),
				{
					root: what.token([
						"round.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "sm",
				}),
				{
					root: what.token([
						"round.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "md",
				}),
				{
					root: what.token([
						"round.md",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "lg",
				}),
				{
					root: what.token([
						"round.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "xl",
				}),
				{
					root: what.token([
						"round.xl",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "full",
				}),
				{
					root: what.token([
						"round.full",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "unset",
			theme: "unset",
			height: "full",
			width: "full",
			orientation: "unset",
			overflow: "unset",
			snap: "unset",
			item: "unset",
			square: "unset",
			gap: "unset",
			position: "unset",
			border: "unset",
			round: "unset",
			shadow: "unset",
		}),
	}),
);

export type ContainerCls = typeof ContainerCls;

export namespace ContainerCls {
	export type Props<P = unknown> = Cls.Props<ContainerCls, P>;
}
