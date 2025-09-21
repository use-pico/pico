import { render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenContext, useCls, withCls } from "../../../src";

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
				"T2",
			],
		},
		t1: {
			token: [
				"t2",
			],
			class: [
				"T1",
			],
		},
	})
	.root({
		root: {
			token: [
				"t1",
			],
			class: [
				"B",
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
				"A2",
			],
		},
		t1: {
			class: [
				"A1",
			],
		},
	})
	.root({
		root: {
			class: [
				"A",
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
				"B2",
			],
		},
		t1: {
			class: [
				"B1",
			],
		},
	})
	.root({
		root: {
			class: [
				"B",
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

const Badge = withCls(BaseBadge, BadgeCls);

describe("react/02-component/nested-cls-providers-last-wins-on-tokens", () => {
	it("innermost ClsProvider tokens are used for token chain expansion", () => {
		const { container } = render(
			<TokenContext value={ProviderA}>
				<TokenContext value={ProviderB}>
					<Badge>content</Badge>
				</TokenContext>
			</TokenContext>,
		);
		const root = container.querySelector(
			'[data-ui="Badge-root"]',
		) as HTMLElement;
		// Innermost ProviderB tokens win: t1->B1; since ProviderB.t1 has no token refs, t2 isn't expanded
		expect(root?.className).toBe("B1 B");
	});
});
