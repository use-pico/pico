import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { TweakProvider, useCls } from "../../../src/react";

describe("react/01-core/use-cls-context-merge-user-and-context", () => {
	it("merges user tweak with tweak from context and returns expected classes", () => {
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
			<TweakProvider
				cls={$cls}
				tweak={{
					variant: {
						size: "md",
					},
				}}
			>
				{children}
			</TweakProvider>
		);

		const { result } = renderHook(() => useCls($cls), {
			wrapper,
		});
		expect(result.current.slots.root()).toBe("base md");
	});
});
