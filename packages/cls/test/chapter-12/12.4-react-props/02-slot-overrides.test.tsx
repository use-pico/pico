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
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": what.css([
						"bg-white",
					]),
					"color.bg.highlighted": what.css([
						"bg-blue-50",
					]),
					"color.text.default": what.css([
						"text-gray-900",
					]),
					"color.text.highlighted": what.css([
						"text-blue-900",
					]),
					"spacing.padding.sm": what.css([
						"p-2",
					]),
					"spacing.padding.md": what.css([
						"p-4",
					]),
					"spacing.padding.lg": what.css([
						"p-6",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.default",
							"color.text.default",
							"spacing.padding.md",
						]),
						header: what.both(
							[
								"font-bold",
							],
							[
								"color.text.default",
							],
						),
						content: what.css([
							"color.text.default",
						]),
					}),
					def.rule(
						{
							theme: "highlighted",
						},
						{
							root: what.css([
								"color.bg.highlighted",
								"color.text.highlighted",
							]),
							header: what.both(
								[
									"font-bold",
								],
								[
									"color.text.highlighted",
								],
							),
							content: what.css([
								"color.text.highlighted",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.css([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.css([
								"spacing.padding.lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					theme: "default",
					size: "md",
				}),
			}),
		);

		const Card: FC<
			Cls.Props<typeof CardCls> & {
				title: string;
				children: string;
			}
		> = ({ tweak: userTweak, title, children }) => {
			const classes = CardCls.create(userTweak);
			return (
				<div className={classes.root()}>
					<h3 className={classes.header()}>{title}</h3>
					<div className={classes.content()}>{children}</div>
				</div>
			);
		};

		// Test with slot-specific overrides
		render(
			<Card
				tweak={({ what }) => ({
					variant: what.variant({
						theme: "highlighted",
						size: "lg",
					}),
				})}
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
