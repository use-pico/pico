import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contract, TokenContext, tweak, useTokenContext } from "../../../src";

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
				"CTX",
			],
		},
	})
	.root({
		root: {
			class: [
				"R",
			],
		},
	})
	.cls();

describe("react/03-context/use-token-context-returns-provided-cls", () => {
	it("returns the same cls passed to TokenContext", () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<TokenContext value={Theme}>{children}</TokenContext>
		);

		const { result } = renderHook(() => useTokenContext(), {
			wrapper,
		});
		expect(result.current).toBe(Theme);
	});
});
