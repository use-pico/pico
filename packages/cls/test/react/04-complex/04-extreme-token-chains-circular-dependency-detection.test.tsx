import { render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls, withCls } from "../../../src";

// Create a deeply nested token chain that goes through 20+ levels
const DeepTokenChain = contract()
	.tokens([
		"t1",
		"t2",
		"t3",
		"t4",
		"t5",
		"t6",
		"t7",
		"t8",
		"t9",
		"t10",
		"t11",
		"t12",
		"t13",
		"t14",
		"t15",
		"t16",
		"t17",
		"t18",
		"t19",
		"t20",
		"t21",
		"t22",
		"t23",
		"t24",
		"t25",
		"t26",
		"t27",
		"t28",
		"t29",
		"t30",
	])
	.slots([
		"root",
		"content",
		"icon",
		"badge",
		"tooltip",
	])
	.variant("theme", [
		"light",
		"dark",
		"auto",
	])
	.variant("size", [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
	])
	.variant("weight", [
		"thin",
		"normal",
		"bold",
		"black",
	])
	.def()
	.token({
		// Chain: t1 -> t2 -> t3 -> ... -> t30
		t1: {
			token: [
				"t2",
			],
			class: [
				"T1",
			],
		},
		t2: {
			token: [
				"t3",
			],
			class: [
				"T2",
			],
		},
		t3: {
			token: [
				"t4",
			],
			class: [
				"T3",
			],
		},
		t4: {
			token: [
				"t5",
			],
			class: [
				"T4",
			],
		},
		t5: {
			token: [
				"t6",
			],
			class: [
				"T5",
			],
		},
		t6: {
			token: [
				"t7",
			],
			class: [
				"T6",
			],
		},
		t7: {
			token: [
				"t8",
			],
			class: [
				"T7",
			],
		},
		t8: {
			token: [
				"t9",
			],
			class: [
				"T8",
			],
		},
		t9: {
			token: [
				"t10",
			],
			class: [
				"T9",
			],
		},
		t10: {
			token: [
				"t11",
			],
			class: [
				"T10",
			],
		},
		t11: {
			token: [
				"t12",
			],
			class: [
				"T11",
			],
		},
		t12: {
			token: [
				"t13",
			],
			class: [
				"T12",
			],
		},
		t13: {
			token: [
				"t14",
			],
			class: [
				"T13",
			],
		},
		t14: {
			token: [
				"t15",
			],
			class: [
				"T14",
			],
		},
		t15: {
			token: [
				"t16",
			],
			class: [
				"T15",
			],
		},
		t16: {
			token: [
				"t17",
			],
			class: [
				"T16",
			],
		},
		t17: {
			token: [
				"t18",
			],
			class: [
				"T17",
			],
		},
		t18: {
			token: [
				"t19",
			],
			class: [
				"T18",
			],
		},
		t19: {
			token: [
				"t20",
			],
			class: [
				"T19",
			],
		},
		t20: {
			token: [
				"t21",
			],
			class: [
				"T20",
			],
		},
		t21: {
			token: [
				"t22",
			],
			class: [
				"T21",
			],
		},
		t22: {
			token: [
				"t23",
			],
			class: [
				"T22",
			],
		},
		t23: {
			token: [
				"t24",
			],
			class: [
				"T23",
			],
		},
		t24: {
			token: [
				"t25",
			],
			class: [
				"T24",
			],
		},
		t25: {
			token: [
				"t26",
			],
			class: [
				"T25",
			],
		},
		t26: {
			token: [
				"t27",
			],
			class: [
				"T26",
			],
		},
		t27: {
			token: [
				"t28",
			],
			class: [
				"T27",
			],
		},
		t28: {
			token: [
				"t29",
			],
			class: [
				"T28",
			],
		},
		t29: {
			token: [
				"t30",
			],
			class: [
				"T29",
			],
		},
		t30: {
			class: [
				"T30",
			],
		}, // End of chain
	})
	.root({
		root: {
			token: [
				"t1",
			],
			class: [
				"COMPONENT",
			],
		},
		content: {
			token: [
				"t5",
			],
			class: [
				"CONTENT",
			],
		},
		icon: {
			token: [
				"t10",
			],
			class: [
				"ICON",
			],
		},
		badge: {
			token: [
				"t15",
			],
			class: [
				"BADGE",
			],
		},
		tooltip: {
			token: [
				"t20",
			],
			class: [
				"TOOLTIP",
			],
		},
	})
	.match("theme", "dark", {
		root: {
			token: [
				"t3",
			],
			class: [
				"DARK",
			],
		},
		content: {
			token: [
				"t8",
			],
			class: [
				"DARK-CONTENT",
			],
		},
	})
	.match("size", "xl", {
		root: {
			token: [
				"t7",
			],
			class: [
				"XL",
			],
		},
		icon: {
			token: [
				"t12",
			],
			class: [
				"XL-ICON",
			],
		},
	})
	.match("weight", "bold", {
		root: {
			token: [
				"t11",
			],
			class: [
				"BOLD",
			],
		},
		content: {
			token: [
				"t16",
			],
			class: [
				"BOLD-CONTENT",
			],
		},
	})
	.defaults({
		theme: "light",
		size: "md",
		weight: "normal",
	})
	.cls();

interface DeepComponentProps
	extends Cls.Props<typeof DeepTokenChain>,
		PropsWithChildren {}
const BaseDeepComponent: FC<DeepComponentProps> = ({
	cls = DeepTokenChain,
	tweak,
	children,
}) => {
	const { slots } = useCls(cls, tweak);
	return (
		<div
			data-ui="Deep-root"
			className={slots.root()}
		>
			<div
				data-ui="Deep-content"
				className={slots.content()}
			>
				{children}
			</div>
			<i
				data-ui="Deep-icon"
				className={slots.icon()}
			/>
			<span
				data-ui="Deep-badge"
				className={slots.badge()}
			/>
			<div
				data-ui="Deep-tooltip"
				className={slots.tooltip()}
			/>
		</div>
	);
};
const DeepComponent = withCls(BaseDeepComponent, DeepTokenChain);

describe("react/04-complex/extreme-token-chains-circular-dependency-detection", () => {
	it("handles extreme 30-level token chains with complex variant combinations", () => {
		const { container } = render(
			<DeepComponent
				tweak={{
					variant: {
						theme: "dark",
						size: "xl",
						weight: "bold",
					},
					slot: {
						root: {
							class: [
								"USER-ROOT",
							],
						},
						content: {
							class: [
								"USER-CONTENT",
							],
						},
					},
				}}
			>
				Deep content
			</DeepComponent>,
		);

		const root = container.querySelector(
			'[data-ui="Deep-root"]',
		) as HTMLElement;
		const content = container.querySelector(
			'[data-ui="Deep-content"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Deep-icon"]',
		) as HTMLElement;
		const badge = container.querySelector(
			'[data-ui="Deep-badge"]',
		) as HTMLElement;
		const tooltip = container.querySelector(
			'[data-ui="Deep-tooltip"]',
		) as HTMLElement;

		// Root: t1->t2->...->t30 chain + base + dark variant (t3 chain) + xl variant (t7 chain) + bold variant (t11 chain) + user
		expect(root.className).toBe(
			"T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 T14 T13 T12 T11 T10 T9 T8 T7 T6 T5 T4 T3 T2 T1 COMPONENT T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 T14 T13 T12 T11 T10 T9 T8 T7 T6 T5 T4 T3 DARK T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 T14 T13 T12 T11 T10 T9 T8 T7 XL T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 T14 T13 T12 T11 BOLD USER-ROOT",
		);

		// Content: t5->t6->...->t30 chain + base + dark variant (t8 chain) + bold variant (t16 chain) + user
		expect(content.className).toBe(
			"T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 T14 T13 T12 T11 T10 T9 T8 T7 T6 T5 CONTENT T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 T14 T13 T12 T11 T10 T9 T8 DARK-CONTENT T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 BOLD-CONTENT USER-CONTENT",
		);

		// Icon: t10->t11->...->t30 chain + base + xl variant (t12 chain)
		expect(icon.className).toBe(
			"T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 T14 T13 T12 T11 T10 ICON T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 T14 T13 T12 XL-ICON",
		);

		// Badge: t15->t16->...->t30 chain + base
		expect(badge.className).toBe(
			"T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 T19 T18 T17 T16 T15 BADGE",
		);

		// Tooltip: t20->t21->...->t30 chain + base
		expect(tooltip.className).toBe(
			"T30 T29 T28 T27 T26 T25 T24 T23 T22 T21 T20 TOOLTIP",
		);
	});
});
