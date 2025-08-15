import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import type { Component } from "../../../src/types";

describe("12.4 React Props - Slot Appending", () => {
	it("should demonstrate Icon component scenario with slot appending", () => {
		const IconCls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"icon-base",
							"text-gray-600",
						]),
					}),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		// Simulate Icon component with internal slot configuration
		const Icon: FC<
			Component<typeof IconCls> & {
				icon: string;
			}
		> = ({ cls: userCls, icon }) => {
			// This simulates the Icon component's useCls call
			const slots = IconCls.create(
				userCls, // userConfigFn
				({ what }) => ({
					slot: what.slot({
						root: what.css([
							icon,
						]), // Internal icon class
					}),
				}), // internalConfigFn
			);
			return (
				<div
					className={slots.root()}
					data-testid="icon"
				/>
			);
		};

		// Test with user providing additional slot configuration
		render(
			<Icon
				cls={({ what }) => ({
					slot: what.slot({
						root: what.css([
							"user-custom-icon",
							"text-blue-500",
						]),
					}),
				})}
				icon="icon-[mdi-light--star]"
			/>,
		);

		const icon = screen.getByTestId("icon");
		expect(icon).toBeInTheDocument();

		// Should have: combined internal+user classes (from merge) + base tokens (from rules)
		expect(icon.className).toBe(
			"icon-base icon-[mdi-light--star] user-custom-icon text-blue-500",
		);
	});

	it("should handle complex slot appending with tokens and classes", () => {
		const ComponentCls = cls(
			{
				tokens: [
					"color.text.primary",
					"color.bg.primary",
				],
				slot: [
					"root",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.text.primary": what.css([
						"text-blue-600",
					]),
					"color.bg.primary": what.css([
						"bg-blue-100",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.text.primary",
							"color.bg.primary",
						]),
					}),
				],
				defaults: def.defaults({
					theme: "light",
				}),
			}),
		);

		const TestComponent: FC<Component<typeof ComponentCls>> = ({
			cls: userCls,
		}) => {
			// Internal config with both CSS and tokens
			const slots = ComponentCls.create(
				userCls, // userConfigFn
				({ what }) => ({
					slot: what.slot({
						root: what.both(
							[
								"internal-css-class",
							],
							[
								"color.text.primary",
							],
						),
					}),
				}), // internalConfigFn
			);
			return (
				<div
					className={slots.root()}
					data-testid="component"
				/>
			);
		};

		// User provides additional styling
		render(
			<TestComponent
				cls={({ what }) => ({
					slot: what.slot({
						root: what.both(
							[
								"user-css-class",
							],
							[
								"color.bg.primary",
							],
						),
					}),
				})}
			/>,
		);

		const component = screen.getByTestId("component");
		expect(component).toBeInTheDocument();

		// Should have: combined internal+user classes and tokens (from merge) + base tokens (from rules)
		expect(component.className).toBe(
			"internal-css-class user-css-class text-blue-600 bg-blue-100",
		);
	});
});
