import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	TokenProvider,
	useCls,
	withCls,
} from "../../../src";

// Theme-like provider cls that only carries tokens
const ThemeTokens = contract()
	.tokens([
		"t1",
	])
	.def()
	.token({
		t1: {
			class: [
				"theme-primary-color",
			],
		},
	})
	.cls();

// Component cls that references token t1
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
				"component-default-color",
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

interface LabelProps extends Cls.Props<typeof LabelCls> {
	children?: string;
}

const BaseLabel: FC<LabelProps> = ({ cls = LabelCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Label-root"
			className={slots.root()}
		>
			{children}
		</span>
	);
};

const Label = withCls(BaseLabel, LabelCls);

describe("react/02-component/cls-provider-provides-tokens", () => {
	it("provider tokens apply when not overridden; component tokens win when provided via tweak", () => {
		const { container, rerender } = render(
			<TokenProvider cls={ThemeTokens}>
				<Label>no-override</Label>
			</TokenProvider>,
		);

		const root = () =>
			container.querySelector('[data-ui="Label-root"]') as HTMLElement;
		// Provider token t1 replaces component default token t1; base class remains
		expect(root().className).toBe("theme-primary-color label-base");

		// Now override tokens via component tweak; user token wins over provider token
		rerender(
			<TokenProvider cls={ThemeTokens}>
				<Label
					tweak={{
						token: {
							t1: {
								class: [
									"user-custom-color",
								],
							},
						},
					}}
				>
					user
				</Label>
			</TokenProvider>,
		);
		expect(root().className).toBe(
			"theme-primary-color user-custom-color label-base",
		);
	});
});
