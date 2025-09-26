import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useTokenContext } from "../../../src";

const Theme = contract()
	.tokens([
		"t1",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t1: {
			class: [
				"theme-context-color",
			],
		},
	})
	.root({
		root: {
			class: [
				"label-base",
			],
		},
	})
	.cls();

describe("react/03-context/use-token-context-returns-provided-cls", () => {
	it("returns the token definitions from TokenProvider", () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<TokenProvider cls={Theme}>{children}</TokenProvider>
		);

		const { result } = renderHook(() => useTokenContext(), {
			wrapper,
		});
		expect(result.current).toBe(Theme.definition?.token);
	});
});
