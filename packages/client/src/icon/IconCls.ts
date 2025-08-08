import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IconCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {
			size: [
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
				"2xl",
				"3xl",
				"4xl",
				"5xl",
				"6xl",
				"7xl",
				"8xl",
			],
			disabled: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ rule }) => [
			rule(
				{
					size: "xs",
				},
				{
					base: {
						class: [
							"text-sm",
						],
					},
				},
			),
			rule(
				{
					size: "sm",
				},
				{
					base: {
						class: [
							"text-sm",
						],
					},
				},
			),
			rule(
				{
					size: "md",
				},
				{
					base: {
						class: [
							"text-base",
						],
					},
				},
			),
			rule(
				{
					size: "lg",
				},
				{
					base: {
						class: [
							"text-lg",
						],
					},
				},
			),
			rule(
				{
					size: "xl",
				},
				{
					base: {
						class: [
							"text-xl",
						],
					},
				},
			),
			rule(
				{
					size: "2xl",
				},
				{
					base: {
						class: [
							"text-2xl",
						],
					},
				},
			),
			rule(
				{
					size: "3xl",
				},
				{
					base: {
						class: [
							"text-3xl",
						],
					},
				},
			),
			rule(
				{
					size: "4xl",
				},
				{
					base: {
						class: [
							"text-4xl",
						],
					},
				},
			),
			rule(
				{
					size: "5xl",
				},
				{
					base: {
						class: [
							"text-5xl",
						],
					},
				},
			),
			rule(
				{
					size: "6xl",
				},
				{
					base: {
						class: [
							"text-6xl",
						],
					},
				},
			),
			rule(
				{
					size: "7xl",
				},
				{
					base: {
						class: [
							"text-7xl",
						],
					},
				},
			),
			rule(
				{
					size: "8xl",
				},
				{
					base: {
						class: [
							"text-8xl",
						],
					},
				},
			),
			rule(
				{
					disabled: true,
				},
				{
					base: {
						class: [
							"pointer-events-none",
							"cursor-not-allowed",
							"text-gray-400",
							"opacity-50",
						],
					},
				},
			),
		],
		defaults: {
			size: "xl",
			disabled: false,
		},
	},
);

export namespace IconCls {
	export type Props<P = unknown> = Component<typeof IconCls, P>;
}
