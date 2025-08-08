import { describe, expect, it } from "bun:test";
import { cls } from "../src/cls";

describe("variants", () => {
	it("applies variant-matched rules with defaults", () => {
		const C = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
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
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"px-2",
									"py-1",
								],
							},
							label: {
								class: [
									"text-sm",
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
									"px-4",
									"py-2",
								],
							},
							label: {
								class: [
									"text-base",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		expect(C.create({}).root).toBe("inline-flex items-center px-4 py-2");
		expect(C.create({}).label).toBe("font-medium text-base");
		const sm = C.create({
			variant: {
				size: "sm",
			},
		});
		expect(sm.root).toBe("inline-flex items-center px-2 py-1");
		expect(sm.label).toBe("font-medium text-sm");
	});
});
