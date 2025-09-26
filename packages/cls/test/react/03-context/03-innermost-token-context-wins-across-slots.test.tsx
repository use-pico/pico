import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useCls, withCls } from "../../../src";

const ChipCls = contract()
	.tokens([
		"tRoot",
		"tIcon",
	])
	.slots([
		"root",
		"icon",
	])
	.def()
	.token({
		tIcon: {
			class: [
				"chip-default-icon-color",
			],
		},
		tRoot: {
			class: [
				"chip-default-root-color",
			],
		},
	})
	.root({
		root: {
			token: [
				"tRoot",
			],
			class: [
				"chip-root-base",
			],
		},
		icon: {
			token: [
				"tIcon",
			],
			class: [
				"chip-icon-base",
			],
		},
	})
	.cls();

const ProviderOuter = contract()
	.tokens([
		"tRoot",
		"tIcon",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		tIcon: {
			class: [
				"theme-outer-icon-color",
			],
		},
		tRoot: {
			class: [
				"theme-outer-root-color",
			],
		},
	})
	.root({
		root: {
			class: [
				"chip-outer-base",
			],
		},
	})
	.cls();

const ProviderInner = contract()
	.tokens([
		"tRoot",
		"tIcon",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		tIcon: {
			class: [
				"theme-inner-icon-color",
			],
		},
		tRoot: {
			class: [
				"theme-inner-root-color",
			],
		},
	})
	.root({
		root: {
			class: [
				"chip-inner-base",
			],
		},
	})
	.cls();

interface ChipProps {
	cls?: typeof ChipCls;
}

const BaseChip: FC<ChipProps> = ({ cls = ChipCls }) => {
	const { slots } = useCls(cls);
	return (
		<span
			data-ui="Chip-root"
			className={slots.root()}
		>
			<i
				data-ui="Chip-icon"
				className={slots.icon()}
			/>
		</span>
	);
};

const Chip = withCls(BaseChip, ChipCls);

describe("react/03-context/innermost-token-context-wins-across-slots", () => {
	it("applies tokens from the innermost provider across all referenced slots", () => {
		const { container } = render(
			<TokenProvider cls={ProviderOuter}>
				<TokenProvider cls={ProviderInner}>
					<Chip />
				</TokenProvider>
			</TokenProvider>,
		);
		const root = container.querySelector(
			'[data-ui="Chip-root"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Chip-icon"]',
		) as HTMLElement;
		expect(root?.className).toBe("theme-inner-root-color chip-root-base");
		expect(icon?.className).toBe("theme-inner-icon-color chip-icon-base");
	});
});
