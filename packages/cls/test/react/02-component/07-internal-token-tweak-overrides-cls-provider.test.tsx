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
				"label-root-base",
			],
		},
	})
	.cls();

const ProviderCls = contract()
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
				"theme-context-color",
			],
		},
	})
	.root({
		root: {
			class: [
				"label-provider-base",
			],
		},
	})
	.cls();

interface LabelProps {
	cls?: typeof LabelCls;
}

const BaseLabel: FC<LabelProps> = ({ cls = LabelCls }) => {
	const { slots } = useCls(cls, [
		undefined,
		{
			token: {
				t1: {
					class: [
						"component-internal-color",
					],
				},
			},
		},
	]);
	return (
		<span
			data-ui="Label-root"
			className={slots.root()}
		/>
	);
};

const Label = BaseLabel;

describe("react/02-component/internal-token-tweak-overrides-cls-provider", () => {
	it("internal tokens override ClsProvider tokens in final output", () => {
		const { container } = render(
			<TokenProvider cls={ProviderCls}>
				<Label />
			</TokenProvider>,
		);
		const root = container.querySelector(
			'[data-ui="Label-root"]',
		) as HTMLElement;
		// Internal token wins over context provided token
		expect(root?.className).toBe(
			"theme-context-color component-internal-color label-root-base",
		);
	});
});
