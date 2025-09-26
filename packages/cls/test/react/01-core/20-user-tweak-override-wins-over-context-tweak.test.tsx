import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/user-tweak-override-wins-over-context-tweak", () => {
	it("user tweak-level override wins over context-provided slot tweak", () => {
		const $cls = contract()
			.slots([
				"root",
				"icon",
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

		// User provides tweak-level override that should win over context
		const { result } = renderHook(
			() =>
				useCls($cls, {
					override: true,
					slot: {
						root: {
							class: [
								"user-override-class",
							],
						},
					},
				}),
			{
				wrapper,
			},
		);

		// User tweak-level override should replace only the root slot classes
		expect(result.current.slots.root()).toBe("base md user-override-class");
		// Icon should still get context variant since user didn't override it
		expect(result.current.slots.icon()).toBe("icon-base icon-medium-size");
	});
});
