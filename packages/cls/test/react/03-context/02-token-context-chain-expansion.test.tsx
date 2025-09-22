import { render } from "@testing-library/react";
import type { FC } from "react";
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
				"DEF2",
			],
		},
		t1: {
			token: [
				"t2",
			],
			class: [
				"DEF1",
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

const Provider = contract()
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
				"P2",
			],
		},
		t1: {
			token: [
				"t2",
			],
			class: [
				"P1",
			],
		},
	})
	.root({
		root: {
			class: [
				"P",
			],
		},
	})
	.cls();

interface BadgeProps {
	cls?: typeof BadgeCls;
}

const BaseBadge: FC<BadgeProps> = ({ cls = BadgeCls }) => {
	const { slots } = useCls(cls);
	return (
		<span
			data-ui="Badge-root"
			className={slots.root()}
		/>
	);
};

const Badge = withCls(BaseBadge, BadgeCls);

describe("react/03-context/token-context-chain-expansion", () => {
	it("expands provider token chains t1->t2 when referenced by component", () => {
		const { container } = render(
			<TokenContext value={Provider}>
				<Badge />
			</TokenContext>,
		);
		const root = container.querySelector(
			'[data-ui="Badge-root"]',
		) as HTMLElement;
		expect(root?.className).toBe("DEF2 DEF1 B");
	});
});
