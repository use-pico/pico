import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/user-what-override-wins-over-context-tweak", () => {
	it("user What-level override wins over context-provided slot tweak", () => {
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
						"i-base",
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
						"i-md",
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

		// User provides What-level override that should win over context
		const { result } = renderHook(
			() =>
				useCls($cls, {
					slot: {
						root: {
							class: [
								"USER-OVR",
							],
							override: true,
						},
					},
				}),
			{
				wrapper,
			},
		);

		// User What-level override should replace all accumulated classes
		expect(result.current.slots.root()).toBe("USER-OVR");
		// Icon should still get context variant since user didn't override it
		expect(result.current.slots.icon()).toBe("i-base i-md");
	});
});
