import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";
import { TweakContext, useCls } from "../../../src/react";

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
			<TweakContext
				value={tweak($cls, {
					variant: {
						size: "md",
					},
				})}
			>
				{children}
			</TweakContext>
		);

		const { result } = renderHook(() => useCls($cls), {
			wrapper,
		});
		expect(result.current.slots.root()).toBe("base md");
	});
});
