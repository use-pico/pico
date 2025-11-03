/** biome-ignore-all lint/style/useComponentExportOnlyModules: Ssst */
import { render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useCls } from "../../../src";

const BadgeCls = contract()
	.tokens([
		"t1",
		"t2",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t2: {
			class: [
				"badge-default-accent-color",
			],
		},
		t1: {
			token: [
				"t2",
			],
			class: [
				"badge-default-primary-color",
			],
		},
	})
	.root({
		root: {
			token: [
				"t1",
			],
			class: [
				"badge-default-base",
			],
		},
	})
	.cls();

const ProviderA = contract()
	.tokens([
		"t1",
		"t2",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t2: {
			class: [
				"theme-provider-a-accent",
			],
		},
		t1: {
			class: [
				"theme-provider-a-primary",
			],
		},
	})
	.root({
		root: {
			class: [
				"badge-provider-a-base",
			],
		},
	})
	.cls();

const ProviderB = contract()
	.tokens([
		"t1",
		"t2",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t2: {
			class: [
				"theme-provider-b-accent",
			],
		},
		t1: {
			class: [
				"theme-provider-b-primary",
			],
		},
	})
	.root({
		root: {
			class: [
				"badge-provider-b-base",
			],
		},
	})
	.cls();

interface BadgeProps extends PropsWithChildren {
	cls?: typeof BadgeCls;
}

const BaseBadge: FC<BadgeProps> = ({ cls = BadgeCls, children }) => {
	const { slots } = useCls(cls);
	return (
		<span
			data-ui="Badge-root"
			className={slots.root()}
		>
			{children}
		</span>
	);
};

const Badge = BaseBadge;

describe("react/02-component/nested-cls-providers-last-wins-on-tokens", () => {
	it("TokenProvider overrides component tokens and nested providers work correctly", () => {
		// Test 1: Without TokenProvider - uses default tokens
		const { container: container1 } = render(<Badge>content</Badge>);
		const root1 = container1.querySelector(
			'[data-ui="Badge-root"]',
		) as HTMLElement;
		expect(root1?.className).toBe(
			"badge-default-accent-color badge-default-primary-color badge-default-base",
		);

		// Test 2: With TokenProvider - uses provider tokens
		const { container: container2 } = render(
			<TokenProvider cls={ProviderA}>
				<Badge>content</Badge>
			</TokenProvider>,
		);
		const root2 = container2.querySelector(
			'[data-ui="Badge-root"]',
		) as HTMLElement;
		expect(root2?.className).toBe(
			"theme-provider-a-primary badge-default-base",
		);

		// Test 3: Nested TokenProviders - innermost ProviderB wins
		const { container: container3 } = render(
			<TokenProvider cls={ProviderA}>
				<TokenProvider cls={ProviderB}>
					<Badge>content</Badge>
				</TokenProvider>
			</TokenProvider>,
		);
		const root3 = container3.querySelector(
			'[data-ui="Badge-root"]',
		) as HTMLElement;
		expect(root3?.className).toBe(
			"theme-provider-b-primary badge-default-base",
		);
	});
});
