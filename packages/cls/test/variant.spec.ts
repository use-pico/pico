import { describe, expect, it } from "bun:test";
import { variant } from "../src/variant";
import { cls } from "../src/cls";
import { match } from "../src/match";

describe("variant() helper", () => {
	it("applies base rule classes to slots in order", () => {
		const bla = cls(
			{
				slot: [
					"foo",
				],
				variant: {
					bla: [
						"a",
						"b",
					],
				},
				tokens: {},
			},
			{
				token: {},
                rule: [
                    match({

                    }, {
                        
                    })
                ],
				defaults: {
					bla: "a",
				},
			},
		);

		const T = variant({
			slots: [
				"root",
				"label",
			],
			variants: {
				size: [
					"sm",
					"md",
				],
			},
			rule: [
				{
					slot: {
						root: {
							class: [
								"inline-flex",
								"items-center",
							],
						},
						label: {
							class: [
								"font-medium",
							],
						},
					},
				},
			],
			defaults: {
				size: "md",
			},
		});

		const s = T.create({});
		expect(s.root).toBe("inline-flex items-center");
		expect(s.label).toBe("font-medium");
	});

	it("respects match rules and ordering with boolean variants", () => {
		const T = variant({
			slots: [
				"root",
			],
			variants: {
				active: [
					"bool",
				],
			},
			rule: [
				{
					slot: {
						root: {
							class: [
								"px-4",
								"py-2",
							],
						},
					},
				},
				{
					match: {
						active: true,
					},
					slot: {
						root: {
							class: [
								"bg-blue-600",
							],
						},
					},
				},
			],
			defaults: {
				active: false,
			},
		});

		expect(T.create({}).root).toBe("px-4 py-2");
		expect(
			T.create({
				variant: {
					active: true,
				},
			}).root,
		).toBe("px-4 py-2 bg-blue-600");
	});

	it("supports override in rules (resetting prior classes for slot)", () => {
		const T = variant({
			slots: [
				"root",
			],
			variants: {
				mode: [
					"a",
					"b",
				],
			},
			rule: [
				{
					slot: {
						root: {
							class: [
								"px-2",
								"py-1",
								"bg-gray-100",
							],
						},
					},
				},
				{
					match: {
						mode: "b",
					},
					override: true,
					slot: {
						root: {
							class: [
								"px-1",
								"bg-red-500",
							],
						},
					},
				},
			],
			defaults: {
				mode: "a",
			},
		});

		expect(T.create({}).root).toBe("px-2 py-1 bg-gray-100");
		expect(
			T.create({
				variant: {
					mode: "b",
				},
			}).root,
		).toBe("px-1 bg-red-500");
	});

	it("allows create-time slot appends and override", () => {
		const T = variant({
			slots: [
				"root",
			],
			variants: {
				selected: [
					"bool",
				],
			},
			rule: [
				{
					slot: {
						root: {
							class: [
								"px-2",
							],
						},
					},
				},
			],
			defaults: {
				selected: false,
			},
		});

		expect(
			T.create({
				slot: {
					root: {
						class: [
							"py-1",
						],
					},
				},
			}).root,
		).toBe("px-2 py-1");
		expect(
			T.create({
				override: {
					root: {
						class: [
							"block",
						],
					},
				},
			}).root,
		).toBe("block");
	});
});
