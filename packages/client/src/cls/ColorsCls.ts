import { PicoCls } from "./PicoCls";

export const ColorsCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"root",
		],
		variant: {
			tone: [
				"primary",
				"secondary",
				"danger",
				"neutral",
				"subtle",
			],
			light: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			// Dark
			def.rule(
				what.variant({
					tone: "primary",
					light: false,
				}),
				{
					root: what.token([
						"primary.color.text-light",
						"primary.color.bg-dark",
						"primary.color.border-dark",
						"primary.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					light: false,
				}),
				{
					root: what.token([
						"secondary.color.text-light",
						"secondary.color.bg-dark",
						"secondary.color.border-dark",
						"secondary.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					light: false,
				}),
				{
					root: what.token([
						"danger.color.text-light",
						"danger.color.bg-dark",
						"danger.color.border-dark",
						"danger.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					light: false,
				}),
				{
					root: what.token([
						"neutral.color.text-dark",
						"neutral.color.bg-dark",
						"neutral.color.border-dark",
						"neutral.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					light: false,
				}),
				{
					root: what.token([
						"subtle.color.text-dark",
						"subtle.color.bg-dark",
						"subtle.color.border-dark",
						"subtle.color.shadow-dark",
					]),
				},
			),

			// Light
			def.rule(
				what.variant({
					tone: "primary",
					light: true,
				}),
				{
					root: what.token([
						"primary.color.text-dark",
						"primary.color.bg-light",
						"primary.color.border-light",
						"primary.color.shadow-light",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					light: true,
				}),
				{
					root: what.token([
						"secondary.color.text-dark",
						"secondary.color.bg-light",
						"secondary.color.border-light",
						"secondary.color.shadow-light",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					light: true,
				}),
				{
					root: what.token([
						"danger.color.text-dark",
						"danger.color.bg-light",
						"danger.color.border-light",
						"danger.color.shadow-light",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					light: true,
				}),
				{
					root: what.token([
						"neutral.color.text-dark",
						"neutral.color.bg-light",
						"neutral.color.border-light",
						"neutral.color.shadow-light",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					light: true,
				}),
				{
					root: what.token([
						"subtle.color.text-dark",
						"subtle.color.bg-light",
						"subtle.color.border-light",
						"subtle.color.shadow-light",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			light: false,
		}),
	}),
);

export type ColorsCls = typeof ColorsCls;
