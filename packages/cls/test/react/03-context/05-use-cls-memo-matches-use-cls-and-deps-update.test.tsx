import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls, useClsMemo } from "../../../src";

const ButtonCls = contract()
	.slots([
		"root",
	])
	.variant("size", [
		"sm",
		"md",
	])
	.def()
	.root({
		root: {
			class: [
				"button-base",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"button-small-size",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"button-medium-size",
			],
		},
	})
	.defaults({
		size: "sm",
	})
	.cls();

describe("react/03-context/use-cls-memo-matches-use-cls-and-deps-update", () => {
	it("produces the same output as useCls and updates only when deps change", () => {
		const { result: r1, rerender: re1 } = renderHook(
			({ size }) =>
				useCls(ButtonCls, [
					{
						variant: {
							size,
						},
					},
				]),
			{
				initialProps: {
					size: "sm" as Cls.VariantOf<typeof ButtonCls, "size">,
				},
			},
		);
		const { result: r2, rerender: re2 } = renderHook(
			({ size }) =>
				useClsMemo(
					ButtonCls,
					[
						{
							variant: {
								size,
							},
						},
						undefined,
					],
					[
						size,
					],
				),
			{
				initialProps: {
					size: "sm" as Cls.VariantOf<typeof ButtonCls, "size">,
				},
			},
		);

		expect(r1.current.slots.root()).toBe("button-base button-small-size");
		expect(r2.current.slots.root()).toBe("button-base button-small-size");

		// Change unrelated prop for memo version; provide same deps so it shouldn't change
		re2({
			size: "sm",
		});
		expect(r2.current.slots.root()).toBe("button-base button-small-size");

		// Update size to md; both should update
		re1({
			size: "md",
		});
		re2({
			size: "md",
		});
		expect(r1.current.slots.root()).toBe("button-base button-medium-size");
		expect(r2.current.slots.root()).toBe("button-base button-medium-size");
	});
});
