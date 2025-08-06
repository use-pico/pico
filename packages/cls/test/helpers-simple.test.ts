import { describe, expect, it } from "bun:test";
import { cls, clsComponent, clsSlots, clsTokens } from "../src";

describe("Helper Functions - Simple Usage", () => {
	describe("clsTokens", () => {
		it("should create token-only props for cls()", () => {
			const designSystem = cls(
				...clsTokens({
					tokens: {
						group: [
							"foundation",
						],
						value: [
							"spacing",
							"color",
						],
					},
					definitions: {
						foundation: {
							spacing: [
								"p-4",
							],
							color: [
								"text-gray-900",
							],
						},
					},
				}),
			);

			// Since no slots are defined, create() should work without group
			const component = designSystem.create("foundation");
			const instance = component();

			// Should have empty slots since no slots were defined
			expect(instance.slots).toEqual({});
		});

		it("should work with inheritance to add slots", () => {
			const tokens = cls(
				...clsTokens({
					tokens: {
						foundation: [
							"spacing",
							"color",
						],
					},
					definitions: {
						foundation: {
							spacing: [
								"p-2",
							],
							color: [
								"text-blue-600",
							],
						},
					},
				}),
			);

			const button = tokens.use(
				{
					slot: [
						"root",
						"icon",
					],
					variant: {},
					tokens: {},
				},
				{
					slot: {
						root: {
							class: [
								"btn",
							],
							token: [
								"foundation.spacing",
								"foundation.color",
							],
						},
						icon: {
							class: [
								"btn-icon",
							],
							token: [
								"foundation.color",
							],
						},
					},
					variant: {},
					tokens: {
						foundation: {
							spacing: [
								"p-2",
							],
							color: [
								"text-blue-600",
							],
						},
					},
					defaults: {},
				},
			);

			const component = button.create("foundation");
			const instance = component();

			expect(instance.slots.root()).toBe("btn p-2 text-blue-600");
			expect(instance.slots.icon()).toBe("btn-icon text-blue-600");
		});
	});

	describe("clsComponent", () => {
		it("should create component props with slots and variants", () => {
			const button = cls(
				...clsComponent({
					slots: [
						"root",
						"label",
					],
					variants: {
						size: [
							"sm",
							"lg",
						],
					},
					classes: {
						root: [
							"btn",
						],
						label: [
							"btn-label",
						],
					},
					definitions: {
						variants: {
							size: {
								sm: {
									root: "btn-sm",
									label: "text-sm",
								},
								lg: {
									root: "btn-lg",
									label: "text-lg",
								},
							},
						},
						defaults: {
							size: "sm",
						},
					},
				}),
			);

			const component = button.create();
			const defaultInstance = component();
			const customInstance = component({
				size: "lg",
			});

			expect(defaultInstance.slots.root()).toBe("btn btn-sm");
			expect(defaultInstance.slots.label()).toBe("btn-label text-sm");

			expect(customInstance.slots.root()).toBe("btn btn-lg");
			expect(customInstance.slots.label()).toBe("btn-label text-lg");
		});

		it("should work without variants", () => {
			const card = cls(
				...clsComponent({
					slots: [
						"root",
						"content",
					],
					classes: {
						root: [
							"card",
						],
						content: [
							"card-content",
						],
					},
					definitions: {},
				}),
			);

			const component = card.create();
			const instance = component();

			expect(instance.slots.root()).toBe("card");
			expect(instance.slots.content()).toBe("card-content");
		});
	});

	describe("clsSlots", () => {
		it("should create simple slot-only props", () => {
			const layout = cls(
				...clsSlots({
					slots: [
						"container",
						"sidebar",
						"main",
					],
					classes: {
						container: [
							"flex",
						],
						sidebar: [
							"w-64",
						],
						main: [
							"flex-1",
						],
					},
				}),
			);

			const component = layout.create();
			const instance = component();

			expect(instance.slots.container()).toBe("flex");
			expect(instance.slots.sidebar()).toBe("w-64");
			expect(instance.slots.main()).toBe("flex-1");
		});

		it("should work with inheritance to add variants", () => {
			const base = cls(
				...clsSlots({
					slots: [
						"root",
					],
					classes: {
						root: [
							"flex",
						],
					},
				}),
			);

			const responsive = base.use(
				{
					slot: [
						"content",
					],
					variant: {
						direction: [
							"row",
							"col",
						],
					},
					tokens: {},
				},
				{
					slot: {
						root: {
							class: [
								"flex",
								"min-h-screen",
							],
							token: [],
						},
						content: {
							class: [
								"p-4",
							],
							token: [],
						},
					},
					variant: {
						direction: {
							row: {
								root: "flex-row",
							},
							col: {
								root: "flex-col",
							},
						},
					},
					tokens: {},
					defaults: {
						direction: "col",
					},
				},
			);

			const component = responsive.create();
			const defaultInstance = component();
			const rowInstance = component({
				direction: "row",
			});

			expect(defaultInstance.slots.root()).toBe(
				"flex min-h-screen flex-col",
			);
			expect(defaultInstance.slots.content()).toBe("p-4");

			expect(rowInstance.slots.root()).toBe("flex min-h-screen flex-row");
			expect(rowInstance.slots.content()).toBe("p-4");
		});
	});

	describe("Helpers Integration", () => {
		it("should combine all helpers for a complete design system", () => {
			// Start with tokens
			const tokens = cls(
				...clsTokens({
					tokens: {
						foundation: [
							"spacing",
							"color",
						],
					},
					definitions: {
						foundation: {
							spacing: [
								"p-2",
							],
							color: [
								"text-gray-900",
							],
						},
					},
				}),
			);

			// Create a button component with slots, variants, and token inheritance
			const button = tokens.use(
				{
					slot: [
						"root",
						"icon",
					],
					variant: {
						variant: [
							"primary",
							"secondary",
						],
					},
					tokens: {},
				},
				{
					slot: {
						root: {
							class: [
								"btn",
							],
							token: [
								"foundation.spacing",
								"foundation.color",
							],
						},
						icon: {
							class: [
								"btn-icon",
							],
							token: [
								"foundation.color",
							],
						},
					},
					variant: {
						variant: {
							primary: {
								root: "btn-primary",
							},
							secondary: {
								root: "btn-secondary",
							},
						},
					},
					tokens: {
						foundation: {
							spacing: [
								"p-2",
							],
							color: [
								"text-gray-900",
							],
						},
					},
					defaults: {
						variant: "primary",
					},
				},
			);

			const component = button.create("foundation");
			const primaryInstance = component();
			const secondaryInstance = component({
				variant: "secondary",
			});

			expect(primaryInstance.slots.root()).toBe(
				"btn p-2 text-gray-900 btn-primary",
			);
			expect(primaryInstance.slots.icon()).toBe("btn-icon text-gray-900");

			expect(secondaryInstance.slots.root()).toBe(
				"btn p-2 text-gray-900 btn-secondary",
			);
			expect(secondaryInstance.slots.icon()).toBe(
				"btn-icon text-gray-900",
			);
		});
	});
});
