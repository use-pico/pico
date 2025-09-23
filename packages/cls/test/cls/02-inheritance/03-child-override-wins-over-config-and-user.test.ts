import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/inheritance/child-override-wins-over-config-and-user", () => {
	it("child rule with override clears base and beats config/user appends", () => {
		const $base = cls(
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
									"base",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"md",
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

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						match: {
							size: "md",
						},
						override: true,
						slot: {
							root: {
								class: [
									"CHILD-OVR",
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

		const { slots } = $child.create(
			tweaks([
				{
					variant: {
						size: "md",
					},
					slot: {
						root: {
							class: [
								"user",
							],
						},
					},
				},
				{
					slot: {
						root: {
							class: [
								"config",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("CHILD-OVR user");
	});
});
