import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/user-what-override-wins-over-context-multiple-slots", () => {
	it("user What-level override on specific slot wins over context, other slots unaffected", () => {
		const $cls = contract()
			.slots([
				"root",
				"icon",
				"label",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"icon-base",
					],
				},
				label: {
					class: [
						"label-base",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"md",
					],
				},
				icon: {
					class: [
						"icon-medium-size",
					],
				},
				label: {
					class: [
						"label-medium-size",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		// Context provides variant that affects all slots
		const wrapper = ({ children }: PropsWithChildren) => (
			<VariantProvider
				cls={$cls}
				variant={{
					size: "md",
				}}
			>
				{children}
			</VariantProvider>
		);

		// User provides What-level override only on icon slot
		const { result } = renderHook(
			() =>
				useCls($cls, {
					slot: {
						icon: {
							class: [
								"user-icon-override-class",
							],
							override: true,
						},
					},
				}),
			{
				wrapper,
			},
		);

		// Root and label should get context variant
		expect(result.current.slots.root()).toBe("base md");
		expect(result.current.slots.label()).toBe(
			"label-base label-medium-size",
		);
		// Icon should be overridden by user
		expect(result.current.slots.icon()).toBe("user-icon-override-class");
	});
});
