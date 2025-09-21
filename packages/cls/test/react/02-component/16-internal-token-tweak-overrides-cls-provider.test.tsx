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
				"CTX",
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

interface LabelProps {
	cls?: typeof LabelCls;
}

const BaseLabel: FC<LabelProps> = ({ cls = LabelCls }) => {
	const { slots } = useCls(cls, undefined, {
		token: {
			t1: {
				class: [
					"INTERNAL",
				],
			},
		},
	});
	return (
		<span
			data-ui="Label-root"
			className={slots.root()}
		/>
	);
};

const Label = withCls(BaseLabel, LabelCls);

describe("react/02-component/internal-token-tweak-overrides-cls-provider", () => {
	it("internal tokens override ClsProvider tokens in final output", () => {
		const { container } = render(
			<TokenContext value={ProviderCls}>
				<Label />
			</TokenContext>,
		);
		const root = container.querySelector(
			'[data-ui="Label-root"]',
		) as HTMLElement;
		// Internal token wins over context provided token
		expect(root?.className).toBe("INTERNAL R");
	});
});
