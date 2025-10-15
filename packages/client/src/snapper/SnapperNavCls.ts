import { PicoCls } from "@use-pico/client";
import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";

export const SnapperNavCls = contract(PicoCls.contract)
	.tokens([
		"snapper.nav.edge.common",
		"snapper.nav.edge.enabled",
		"snapper.nav.edge.disabled",
	])
	.slots([
		"root",
		"items",
		"item",
		"first",
		"last",
	])
	.variant("orientation", [
		"vertical",
		"horizontal",
	])
	.variant("align", [
		"left",
		"right",
	])
	.bool("subtle")
	.bool("active")
	.bool("first")
	.bool("last")
	.def()
	.token({
		"snapper.nav.edge.common": {
			class: [
				"pointer-events-auto",
				"select-none",
				"transition",
			],
		},
		"snapper.nav.edge.enabled": {
			class: [
				"opacity-80",
				"hover:opacity-100",
				"cursor-pointer",
			],
		},
		"snapper.nav.edge.disabled": {
			class: [
				"opacity-40",
				"hover:opacity-40",
				"cursor-not-allowed",
			],
		},
	})
	.root({
		root: {
			class: [
				"SnapperNav-root",
				"absolute",
				"z-20",
				"pointer-events-none",
			],
			token: [
				"square.sm",
				"round.lg",
			],
		},
		items: {
			class: [
				"SnapperNav-items",
				"gap-4",
				"flex",
				"items-center",
				"justify-center",
			],
		},
		item: {
			class: [
				"pointer-events-auto",
				"select-none",
				"transition",
				"cursor-pointer",
			],
		},
		first: {
			token: [
				"snapper.nav.edge.common",
			],
		},
		last: {
			token: [
				"snapper.nav.edge.common",
			],
		},
	})
	//
	.switch(
		"subtle",
		{
			root: {
				class: [
					"opacity-40",
				],
			},
		},
		{
			root: {
				class: [
					"bg-white/60",
					"opacity-60",
				],
			},
		},
	)
	//
	.match("orientation", "vertical", {
		items: {
			class: [
				"flex-col",
			],
		},
	})
	.match("orientation", "horizontal", {
		root: {
			class: [
				"bottom-4",
				"left-1/2",
				"-translate-x-1/2",
			],
		},
		items: {
			class: [
				"flex-row",
			],
		},
	})
	.rule(
		{
			orientation: "vertical",
			align: "left",
		},
		{
			root: {
				class: [
					"left-1",
					"top-1/2",
					"-translate-y-1/2",
				],
			},
		},
	)
	.rule(
		{
			orientation: "vertical",
			align: "right",
		},
		{
			root: {
				class: [
					"right-1",
					"top-1/2",
					"-translate-y-1/2",
				],
			},
		},
	)
	.switch(
		"active",
		{
			item: {
				class: [
					"scale-125",
					"opacity-100",
				],
			},
		},
		{
			item: {
				class: [
					"opacity-60",
					"hover:opacity-90",
				],
			},
		},
	)
	.switch(
		"first",
		{
			first: {
				token: [
					"snapper.nav.edge.disabled",
				],
			},
		},
		{
			first: {
				token: [
					"snapper.nav.edge.enabled",
				],
			},
		},
	)
	.switch(
		"last",
		{
			last: {
				token: [
					"snapper.nav.edge.disabled",
				],
			},
		},
		{
			last: {
				token: [
					"snapper.nav.edge.enabled",
				],
			},
		},
	)
	.defaults({
		tone: "primary",
		theme: "light",
		orientation: "vertical",
		align: "right",
		subtle: false,
		active: false,
		first: false,
		last: false,
	})
	.cls();

export type SnapperNavCls = typeof SnapperNavCls;

export namespace SnapperNavCls {
	export type Props<P = unknown> = Cls.Props<SnapperNavCls, P>;
}
