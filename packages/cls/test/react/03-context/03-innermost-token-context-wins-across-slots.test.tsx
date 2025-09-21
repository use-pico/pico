import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenContext, useCls, withCls } from "../../../src";

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
				"I",
			],
		},
		tRoot: {
			class: [
				"R",
			],
		},
	})
	.root({
		root: {
			token: [
				"tRoot",
			],
			class: [
				"ROOT",
			],
		},
		icon: {
			token: [
				"tIcon",
			],
			class: [
				"ICON",
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
				"O-I",
			],
		},
		tRoot: {
			class: [
				"O-R",
			],
		},
	})
	.root({
		root: {
			class: [
				"O",
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
				"I-I",
			],
		},
		tRoot: {
			class: [
				"I-R",
			],
		},
	})
	.root({
		root: {
			class: [
				"I",
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
			<TokenContext value={ProviderOuter}>
				<TokenContext value={ProviderInner}>
					<Chip />
				</TokenContext>
			</TokenContext>,
		);
		const root = container.querySelector(
			'[data-ui="Chip-root"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Chip-icon"]',
		) as HTMLElement;
		expect(root?.className).toBe("I-R ROOT");
		expect(icon?.className).toBe("I-I ICON");
	});
});
