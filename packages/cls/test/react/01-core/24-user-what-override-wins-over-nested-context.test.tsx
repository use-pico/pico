import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useCls, VariantProvider } from "../../../src";

describe("react/01-core/user-what-override-wins-over-nested-context", () => {
	it("user What-level override wins over nested context providers (token + variant)", () => {
		const $cls = contract()
			.slots([
				"root",
				"icon",
			])
			.tokens([
				"color.text",
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
			.token({
				"color.text": {
					class: [
						"text-gray-500",
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

		// Create a token provider
		const TokenProviderCls = contract()
			.tokens([
				"color.text",
			])
			.slots([
				"root",
				"icon",
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
				icon: {
					class: [
						"provider-icon",
					],
				},
			})
			.cls();

		// Nested context providers
		const wrapper = ({ children }: PropsWithChildren) => (
			<TokenProvider cls={TokenProviderCls}>
				<VariantProvider
					cls={$cls}
					variant={{
						size: "md",
					}}
				>
					{children}
				</VariantProvider>
			</TokenProvider>
		);

		// User provides What-level override that should win over all context
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

		// User What-level override should replace all accumulated classes (base + token + variant)
		expect(result.current.slots.root()).toBe("user-override-class");
		// Icon should still get context variant since user didn't override it
		expect(result.current.slots.icon()).toBe("icon-base icon-medium-size");
	});
});
