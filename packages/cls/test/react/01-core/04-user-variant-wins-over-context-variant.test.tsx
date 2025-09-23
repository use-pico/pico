import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, VariantProvider } from "../../../src";
import { useCls } from "../../../src/react";

describe("react/01-core/user-variant-wins-over-context-variant", () => {
	it("applies user variant over context variant when both provided", () => {
		const $cls = contract()
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
						"base",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

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

		const { result } = renderHook(
			() =>
				useCls($cls, {
					variant: {
						size: "sm",
					},
				}),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe("base");
	});
});
