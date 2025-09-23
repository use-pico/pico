import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { useCls } from "../../../src/react";

describe("react/01-core/use-cls-basic-create", () => {
	it("returns classes using builder-only cls and no intermediate vars", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.cls();

		const { result } = renderHook(() => useCls($cls));
		expect(result.current.slots.root()).toBe("base");
	});
});
