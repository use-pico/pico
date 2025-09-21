import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	TokenContext,
	TweakProvider,
	useCls,
	withCls,
} from "../../../src";

// Provider of design tokens only
const ThemeTokens = contract()
	.tokens([
		"t1",
	])
	.def()
	.token({
		t1: {
			class: [
				"CTX1",
			],
		},
	})
	.cls();

// Component that uses tokens + variant + base class
const PillCls = contract()
	.tokens([
		"t1",
	])
	.slots([
		"root",
	])
	.variant("tone", [
		"neutral",
		"success",
	])
	.def()
	.token({
		t1: {
			class: [
				"LOCAL1",
			],
		},
	})
	.root({
		root: {
			token: [
				"t1",
			],
			class: [
				"base",
			],
		},
	})
	.match("tone", "success", {
		root: {
			class: [
				"ok",
			],
		},
	})
	.defaults({
		tone: "neutral",
	})
	.cls();

interface PillProps extends Cls.Props<typeof PillCls> {
	children?: string;
}

const BasePill: FC<PillProps> = ({ cls = PillCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Pill-root"
			className={slots.root()}
		>
			{children}
		</span>
	);
};

const Pill = withCls(BasePill, PillCls);

describe("react/02-component/cls-provider-with-tweak-provider-combine", () => {
	it("combines provider tokens and provider tweaks; component tweak overrides and appends last", () => {
		const { container, rerender } = render(
			<TokenContext value={ThemeTokens}>
				<TweakProvider
					cls={PillCls}
					tweak={{
						variant: {
							tone: "success",
						},
						slot: {
							root: {
								class: [
									"P",
								],
							},
						},
					}}
				>
					<Pill>provider-only</Pill>
				</TweakProvider>
			</TokenContext>,
		);

		const root = () =>
			container.querySelector('[data-ui="Pill-root"]') as HTMLElement;
		// Order: tokens (from ClsProvider) + base + variant(ok) + provider append(P)
		expect(root().className).toBe("CTX1 base ok P");

		// Now component tweak overrides token and variant, appends U after provider
		rerender(
			<TokenContext value={ThemeTokens}>
				<TweakProvider
					cls={PillCls}
					tweak={{
						variant: {
							tone: "success",
						},
						slot: {
							root: {
								class: [
									"P",
								],
							},
						},
					}}
				>
					<Pill
						tweak={{
							token: {
								t1: {
									class: [
										"USER1",
									],
								},
							},
							variant: {
								tone: "neutral",
							},
							slot: {
								root: {
									class: [
										"U",
									],
								},
							},
						}}
					>
						user
					</Pill>
				</TweakProvider>
			</TokenContext>,
		);
		// Order: user token overrides CTX1; variant neutral removes ok; provider P then user U
		expect(root().className).toBe("USER1 base P U");
	});
});
