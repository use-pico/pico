import { render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	TokenContext,
	TweakProvider,
	useCls,
	withCls,
} from "../../../src";

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

describe("react/04-complex/token-overrides-nested-providers", () => {
	it("handles token overrides at various chain levels with nested providers", () => {
		const OverrideProvider = contract()
			.tokens([
				"t1",
				"t5",
				"t10",
				"t15",
				"t20",
			])
			.def()
			.token({
				t1: {
					class: [
						"OVERRIDE-T1",
					],
				}, // Override start of chain
				t5: {
					class: [
						"OVERRIDE-T5",
					],
				}, // Override middle of chain
				t10: {
					class: [
						"OVERRIDE-T10",
					],
				}, // Override middle of chain
				t15: {
					class: [
						"OVERRIDE-T15",
					],
				}, // Override middle of chain
				t20: {
					class: [
						"OVERRIDE-T20",
					],
				}, // Override near end of chain
			})
			.cls();

		const { container } = render(
			<TokenContext value={OverrideProvider}>
				<TweakProvider
					cls={DeepTokenChain}
					tweak={{
						variant: {
							theme: "dark",
							size: "2xl",
						},
						slot: {
							root: {
								token: [
									"t25",
								], // Use different token at root level
								class: [
									"PROVIDER-ROOT",
								],
							},
						},
					}}
				>
					<DeepComponent
						tweak={{
							slot: {
								content: {
									token: [
										"t1",
									], // Override to use t1 chain
									class: [
										"USER-CONTENT",
									],
								},
							},
						}}
					>
						Override test
					</DeepComponent>
				</TweakProvider>
			</TokenContext>,
		);

		const root = container.querySelector(
			'[data-ui="Deep-root"]',
		) as HTMLElement;
		const content = container.querySelector(
			'[data-ui="Deep-content"]',
		) as HTMLElement;

		// Root should use t25 chain with provider overrides
		expect(root.className).toBe(
			"OVERRIDE-T1 COMPONENT OVERRIDE-T5 T4 T3 DARK T30 T29 T28 T27 T26 T25 PROVIDER-ROOT",
		);

		// Content should use t1 chain with token overrides
		expect(content.className).toBe(
			"OVERRIDE-T5 CONTENT OVERRIDE-T10 T9 T8 DARK-CONTENT OVERRIDE-T1 USER-CONTENT",
		);
	});
});
