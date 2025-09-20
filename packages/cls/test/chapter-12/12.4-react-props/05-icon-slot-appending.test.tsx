import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import type { Cls } from "../../../src";
import { cls } from "../../../src";

describe("12.4 React Props - Icon Slot Appending", () => {
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
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"icon-base",
									"text-gray-600",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		// Simulate Icon component with internal slot configuration
		const Icon: FC<
			Cls.Props<typeof IconCls> & {
				icon: string;
			}
		> = ({ tweak: userTweak, icon }) => {
			const { slots } = IconCls.create(userTweak, {
				slot: {
					root: {
						class: [
							icon,
						],
					},
				},
			});
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
				tweak={{
					slot: {
						root: {
							class: [
								"user-custom-icon",
								"text-blue-500",
							],
						},
					},
				}}
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
});
