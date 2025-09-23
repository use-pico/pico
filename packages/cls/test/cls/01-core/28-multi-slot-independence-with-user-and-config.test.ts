import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/multi-slot-independence-with-user-and-config", () => {
	it("applies tweaks independently per slot with correct order", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
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
									"root-base",
								],
							},
							icon: {
								class: [
									"icon-base",
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
									"root-md",
								],
							},
							icon: {
								class: [
									"icon-md",
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

		const { slots } = $cls.create(
			{
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"root-user",
						],
					},
					icon: {
						class: [
							"icon-user",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"root-config",
						],
					},
					icon: {
						class: [
							"icon-config",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("root-base root-md root-user root-config");
		expect(slots.icon()).toBe("icon-base icon-md icon-user icon-config");
	});
});
