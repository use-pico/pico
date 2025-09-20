import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import type { Cls } from "../../../src";
import { cls } from "../../../src";

describe("12.4 React Props - Slot Overrides", () => {
	it("should handle cls prop with slot overrides", () => {
		const CardCls = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.highlighted",
					"color.text.default",
					"color.text.highlighted",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
				slot: [
					"root",
					"header",
					"content",
				],
				variant: {
					theme: [
						"default",
						"highlighted",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-white",
						],
					},
					"color.bg.highlighted": {
						class: [
							"bg-blue-50",
						],
					},
					"color.text.default": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.highlighted": {
						class: [
							"text-blue-900",
						],
					},
					"spacing.padding.sm": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.md": {
						class: [
							"p-4",
						],
					},
					"spacing.padding.lg": {
						class: [
							"p-6",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"color.bg.default",
									"color.text.default",
									"spacing.padding.md",
								],
							},
							header: {
								class: [
									"font-bold",
								],
								token: [
									"color.text.default",
								],
							},
							content: {
								class: [
									"color.text.default",
								],
							},
						},
					},
					{
						match: {
							theme: "highlighted",
						},
						slot: {
							root: {
								class: [
									"color.bg.highlighted",
									"color.text.highlighted",
								],
							},
							header: {
								class: [
									"font-bold",
								],
								token: [
									"color.text.highlighted",
								],
							},
							content: {
								class: [
									"color.text.highlighted",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"spacing.padding.sm",
								],
							},
						},
					},
					{
						match: {
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"spacing.padding.lg",
								],
							},
						},
					},
				],
				defaults: {
					theme: "default",
					size: "md",
				},
			},
		);

		const Card: FC<
			Cls.Props<typeof CardCls> & {
				title: string;
				children: string;
			}
		> = ({ tweak: userTweak, title, children }) => {
			const { slots } = CardCls.create(userTweak);
			return (
				<div className={slots.root()}>
					<h3 className={slots.header()}>{title}</h3>
					<div className={slots.content()}>{children}</div>
				</div>
			);
		};

		// Test with slot-specific overrides
		render(
			<Card
				tweak={{
					variant: {
						theme: "highlighted",
						size: "lg",
					},
				}}
				title="Test Card"
			>
				Card content
			</Card>,
		);

		const card = screen.getByText?.("Test Card").closest("div");
		expect(card).toBeInTheDocument();
		expect(screen.getByText?.("Card content")).toBeInTheDocument();
	});
});
