import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useClsContext } from "../../../src/react";

describe("12.2 React Context - No Provider Context", () => {
	it("should provide undefined context when no provider", () => {
		// Test component that uses context
		function TestComponent() {
			const contextCls = useClsContext();
			return (
				<div data-testid="context-test">
					{contextCls ? "Context provided" : "No context"}
				</div>
			);
		}

		// Render without provider
		render(<TestComponent />);

		// Should show that no context is provided
		expect(screen.getByTestId?.("context-test")).toHaveTextContent(
			"No context",
		);
	});
});
