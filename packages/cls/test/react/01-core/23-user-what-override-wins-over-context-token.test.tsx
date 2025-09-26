import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useCls } from "../../../src";

describe("react/01-core/user-what-override-wins-over-context-token", () => {
	it("user What-level override wins over context-provided token tweak", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.tokens([
				"color.text",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.token({
				"color.text": {
					class: [
						"text-gray-500",
					],
				},
			})
			.cls();

		// Create a token provider
		const TokenProviderCls = contract()
			.tokens([
				"color.text",
			])
			.slots([
				"root",
			])
			.def()
			.token({
				"color.text": {
					class: [
						"text-blue-500",
					],
				},
			})
			.root({
				root: {
					class: [
						"provider-base",
					],
				},
			})
			.cls();

		// Context provides token tweak
		const wrapper = ({ children }: PropsWithChildren) => (
			<TokenProvider cls={TokenProviderCls}>{children}</TokenProvider>
		);

		// User provides What-level override that should win over context
		const { result } = renderHook(
			() =>
				useCls($cls, {
					slot: {
						root: {
							class: [
								"user-override-class",
							],
							override: true,
						},
					},
				}),
			{
				wrapper,
			},
		);

		// User What-level override should replace all accumulated classes (including context token)
		expect(result.current.slots.root()).toBe("user-override-class");
	});
});
