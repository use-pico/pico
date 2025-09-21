import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	TweakProvider,
	useCls,
	withCls,
} from "../../../src";

const LabelCls = contract()
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
			token: [
				"t2",
			],
			class: [
				"A1",
			],
		},
	})
	.root({
		root: {
			token: [
				"t1",
			],
			class: [
				"base",
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

describe("react/02-component/inherit-token-overlay-last-wins-per-token", () => {
	it("child overlay on the same token replaces parent overlay; other tokens unaffected", () => {
		const { container } = render(
			<TweakProvider
				cls={LabelCls}
				tweak={{
					token: {
						t1: {
							class: [
								"P1",
							],
						},
					},
				}}
			>
				<TweakProvider
					cls={LabelCls}
					inherit
					tweak={{
						token: {
							t1: {
								class: [
									"C1",
								],
							},
							t2: {
								class: [
									"C2",
								],
							},
						},
					}}
				>
					<Label>label</Label>
				</TweakProvider>
			</TweakProvider>,
		);

		const root = container.querySelector(
			'[data-ui="Label-root"]',
		) as HTMLElement;
		// t1 overlay C1 replaces P1; t2 overlay present but not surfaced without direct reference in output
		expect(root?.className).toBe("C1 base");
	});
});
