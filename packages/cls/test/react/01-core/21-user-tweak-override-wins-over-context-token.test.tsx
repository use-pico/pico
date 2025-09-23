import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenContext, useCls } from "../../../src";

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
		const TokenProvider = contract()
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
			<TokenContext value={TokenProvider}>{children}</TokenContext>
		);

		// User provides tweak-level override that should win over context
		const { result } = renderHook(
			() =>
				useCls($cls, {
					override: true,
					slot: {
						root: {
							class: [
								"USER-OVR",
							],
						},
					},
				}),
			{
				wrapper,
			},
		);

		// User tweak-level override should replace all accumulated classes (including context token)
		expect(result.current.slots.root()).toBe("USER-OVR");
	});
});
