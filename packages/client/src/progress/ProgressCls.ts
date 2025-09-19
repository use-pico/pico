import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ProgressCls = contract(PicoCls.contract)
	.slots([
		"root",
		"progress",
	])
	.variant("size", [
		"xs",
		"sm",
		"md",
		"lg",
	])
	.def()
	.root({
		root: {
			class: [
				"Progress-root",
				"h-full",
				"w-full",
				"transition-all",
			],
			token: [
				"round.default",
				"tone.neutral.light.bg",
				"shadow.sm",
			],
		},
		progress: {
			class: [
				"Progress-progress",
				"h-full",
				"leading-none",
				"transition-all",
			],
			token: [
				"round.default",
				"shadow.md",
			],
		},
	})
	// Size variants
	.match("size", "xs", {
		root: {
			class: [
				"h-0.5",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"h-1",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"h-2",
			],
		},
	})
	.match("size", "lg", {
		root: {
			class: [
				"h-4",
			],
		},
	})
	// Tone variants for progress bar (light theme)
	.rule(
		{
			tone: "primary",
			theme: "light",
		},
		{
			progress: {
				token: [
					"tone.primary.light.bg",
					"tone.primary.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "secondary",
			theme: "light",
		},
		{
			progress: {
				token: [
					"tone.secondary.light.bg",
					"tone.secondary.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "danger",
			theme: "light",
		},
		{
			progress: {
				token: [
					"tone.danger.light.bg",
					"tone.danger.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "warning",
			theme: "light",
		},
		{
			progress: {
				token: [
					"tone.warning.light.bg",
					"tone.warning.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "neutral",
			theme: "light",
		},
		{
			progress: {
				token: [
					"tone.neutral.light.bg",
					"tone.neutral.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "subtle",
			theme: "light",
		},
		{
			progress: {
				token: [
					"tone.subtle.light.bg",
					"tone.subtle.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "link",
			theme: "light",
		},
		{
			progress: {
				token: [
					"tone.link.light.bg",
					"tone.link.light.border",
				],
			},
		},
	)
	// Tone variants for progress bar (dark theme)
	.rule(
		{
			tone: "primary",
			theme: "dark",
		},
		{
			progress: {
				token: [
					"tone.primary.dark.bg",
					"tone.primary.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "secondary",
			theme: "dark",
		},
		{
			progress: {
				token: [
					"tone.secondary.dark.bg",
					"tone.secondary.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "danger",
			theme: "dark",
		},
		{
			progress: {
				token: [
					"tone.danger.dark.bg",
					"tone.danger.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "warning",
			theme: "dark",
		},
		{
			progress: {
				token: [
					"tone.warning.dark.bg",
					"tone.warning.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "neutral",
			theme: "dark",
		},
		{
			progress: {
				token: [
					"tone.neutral.dark.bg",
					"tone.neutral.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "subtle",
			theme: "dark",
		},
		{
			progress: {
				token: [
					"tone.subtle.dark.bg",
					"tone.subtle.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "link",
			theme: "dark",
		},
		{
			progress: {
				token: [
					"tone.link.dark.bg",
					"tone.link.dark.border",
				],
			},
		},
	)
	.defaults({
		tone: "primary",
		theme: "light",
		size: "md",
	})
	.cls();

export type ProgressCls = typeof ProgressCls;

export namespace ProgressCls {
	export type Props<P = unknown> = Cls.Props<typeof ProgressCls, P>;
}
