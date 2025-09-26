import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useCls } from "../../../src";

describe("react/01-core/user-tweak-override-wins-over-context-token", () => {
	it("user tweak-level override wins over context-provided token tweak", () => {
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

		// User provides tweak-level override that should win over context
		const { result } = renderHook(
			() =>
				useCls($cls, {
					override: true,
					slot: {
						root: {
							class: [
								"user-override-color",
							],
						},
					},
				}),
			{
				wrapper,
			},
		);

		// User tweak-level override should replace only the root slot classes
		expect(result.current.slots.root()).toBe("base user-override-color");
	});
});
