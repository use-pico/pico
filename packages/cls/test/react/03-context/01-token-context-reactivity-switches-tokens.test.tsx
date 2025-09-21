import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenContext, useCls, withCls } from "../../../src";

const LabelCls = contract()
	.tokens([
		"t1",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t1: {
			class: [
				"DEF",
			],
		},
	})
	.root({
		root: {
			token: [
				"t1",
			],
			class: [
				"R",
			],
		},
	})
	.cls();

const ProviderA = contract()
	.tokens([
		"t1",
	])
	.slots([
		"root",
	])
	.def()
	.token({
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
	])
	.slots([
		"root",
	])
	.def()
	.token({
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

interface LabelProps {
	cls?: typeof LabelCls;
}

const BaseLabel: FC<LabelProps> = ({ cls = LabelCls }) => {
	const { slots } = useCls(cls);
	return (
		<span
			data-ui="Label-root"
			className={slots.root()}
		/>
	);
};

const Label = withCls(BaseLabel, LabelCls);

describe("react/03-context/token-context-reactivity-switches-tokens", () => {
	it("switches tokens when TokenContext value changes", () => {
		const { container, rerender } = render(
			<TokenContext value={ProviderA}>
				<Label />
			</TokenContext>,
		);
		const root = () =>
			container.querySelector('[data-ui="Label-root"]') as HTMLElement;
		expect(root().className).toBe("A1 R");

		rerender(
			<TokenContext value={ProviderB}>
				<Label />
			</TokenContext>,
		);
		expect(root().className).toBe("B1 R");
	});
});
