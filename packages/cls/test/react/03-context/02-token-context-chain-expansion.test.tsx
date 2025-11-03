/** biome-ignore-all lint/style/useComponentExportOnlyModules: Ssst */
import { render } from "@testing-library/react";
import type { FC } from "react";
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
				"badge-base",
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
				"theme-accent-color",
			],
		},
		t1: {
			token: [
				"t2",
			],
			class: [
				"theme-primary-color",
			],
		},
	})
	.root({
		root: {
			class: [
				"badge-base",
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

const Badge = BaseBadge;

describe("react/03-context/token-context-chain-expansion", () => {
	it("expands provider token chains t1->t2 when referenced by component", () => {
		const { container } = render(
			<TokenProvider cls={Provider}>
				<Badge />
			</TokenProvider>,
		);
		const root = container.querySelector(
			'[data-ui="Badge-root"]',
		) as HTMLElement;
		expect(root?.className).toBe(
			"theme-accent-color theme-primary-color badge-base",
		);
	});
});
