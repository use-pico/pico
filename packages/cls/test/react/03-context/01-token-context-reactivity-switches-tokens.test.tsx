/** biome-ignore-all lint/style/useComponentExportOnlyModules: Ssst */
import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useCls } from "../../../src";

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
				"label-default-color",
			],
		},
	})
	.root({
		root: {
			token: [
				"t1",
			],
			class: [
				"label-base",
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
				"theme-primary-color",
			],
		},
	})
	.root({
		root: {
			class: [
				"label-base",
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
				"theme-secondary-color",
			],
		},
	})
	.root({
		root: {
			class: [
				"label-base",
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

const Label = BaseLabel;

describe("react/03-context/token-context-reactivity-switches-tokens", () => {
	it("switches tokens when TokenProvider cls changes", () => {
		const { container, rerender } = render(
			<TokenProvider cls={ProviderA}>
				<Label />
			</TokenProvider>,
		);
		const root = () =>
			container.querySelector('[data-ui="Label-root"]') as HTMLElement;
		expect(root().className).toBe("theme-primary-color label-base");

		rerender(
			<TokenProvider cls={ProviderB}>
				<Label />
			</TokenProvider>,
		);
		expect(root().className).toBe("theme-secondary-color label-base");
	});
});
