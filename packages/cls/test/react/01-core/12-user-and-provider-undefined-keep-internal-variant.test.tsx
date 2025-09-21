import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/user-and-provider-undefined-keep-internal-variant", () => {
	it("uses internal variant when user and provider supply undefined", () => {
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
					variant: {
						size: undefined,
					},
				}}
			>
				{children}
			</VariantProvider>
		);

		const { result } = renderHook(
			() =>
				useCls(
					$cls,
					{
						variant: {
							size: undefined,
						},
					},
					{
						variant: {
							size: "md",
						},
					},
				),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe("base MD");
	});
});
