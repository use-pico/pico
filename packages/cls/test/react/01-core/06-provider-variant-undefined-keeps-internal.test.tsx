import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/provider-variant-undefined-keeps-internal", () => {
	it("keeps internal variant when provider supplies undefined and user omits", () => {
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
			.match("size", "sm", {
				root: {
					class: [
						"SM",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"MD",
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
					size: undefined,
				}}
			>
				{children}
			</VariantProvider>
		);

		const { result } = renderHook(
			() =>
				useCls($cls, [
					undefined,
					{
						variant: {
							size: "md",
						},
					},
				]),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe("base MD");
	});
});
