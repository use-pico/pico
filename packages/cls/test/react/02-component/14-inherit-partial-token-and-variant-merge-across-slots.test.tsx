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

const CardCls = contract()
	.tokens([
		"a",
		"b",
	])
	.slots([
		"root",
		"icon",
	])
	.variant("tone", [
		"neutral",
		"alert",
	])
	.def()
	.token({
		b: {
			class: [
				"B",
			],
		},
		a: {
			token: [
				"b",
			],
			class: [
				"A",
			],
		},
	})
	.root({
		root: {
			token: [
				"a",
			],
			class: [
				"R",
			],
		},
		icon: {
			class: [
				"I",
			],
		},
	})
	.match("tone", "alert", {
		root: {
			class: [
				"AL",
			],
		},
		icon: {
			class: [
				"AL-i",
			],
		},
	})
	.defaults({
		tone: "neutral",
	})
	.cls();

interface CardProps extends Cls.Props<typeof CardCls> {
	children?: string;
}

const BaseCard: FC<CardProps> = ({ cls = CardCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<div
			data-ui="Card-root"
			className={slots.root()}
		>
			<i
				data-ui="Card-icon"
				className={slots.icon()}
			/>
			{children}
		</div>
	);
};

const Card = withCls(BaseCard, CardCls);

describe("react/02-component/inherit-partial-token-and-variant-merge-across-slots", () => {
	it("merges parent token overlay and child variant + other slot append without conflicts", () => {
		const { container } = render(
			<TweakProvider
				cls={CardCls}
				tweak={{
					token: {
						a: {
							class: [
								"P-a",
							],
						},
					},
					slot: {
						icon: {
							class: [
								"P-i",
							],
						},
					},
				}}
			>
				<TweakProvider
					cls={CardCls}
					inherit
					tweak={{
						variant: {
							tone: "alert",
						},
						slot: {
							root: {
								class: [
									"C-r",
								],
							},
						},
					}}
				>
					<Card>card</Card>
				</TweakProvider>
			</TweakProvider>,
		);

		const root = container.querySelector(
			'[data-ui="Card-root"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Card-icon"]',
		) as HTMLElement;
		// Token chain a->b expands, but overlay P-a replaces token a output; child sets variant and appends C-r to root; parent adds P-i to icon
		expect(root?.className).toBe("P-a R AL C-r");
		expect(icon?.className).toBe("I AL-i P-i");
	});
});
