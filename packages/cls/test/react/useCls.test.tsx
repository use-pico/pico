import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";
import { ClsProvider, useCls } from "../../src/react";

// Create a simple cls instance for testing
const TestCls = cls(
	{
		tokens: {
			"primary.textColor": [
				"default",
				"hover",
			],
			"primary.bgColor": [
				"default",
				"hover",
			],
		},
		slot: [
			"root",
			"label",
		],
		variant: {
			size: [
				"sm",
				"md",
				"lg",
			],
			variant: [
				"primary",
				"secondary",
			],
		},
	},
	{
		token: {
			"primary.textColor": {
				default: [
					"text-white",
				],
				hover: [
					"text-blue-100",
				],
			},
			"primary.bgColor": {
				default: [
					"bg-blue-500",
				],
				hover: [
					"bg-blue-600",
				],
			},
		},
		rules: ({ root, rule }) => [
			root({
				root: {
					class: [
						"inline-flex",
						"items-center",
					],
					token: [
						"primary.bgColor.default",
						"primary.textColor.default",
					],
				},
				label: {
					class: [
						"font-medium",
					],
				},
			}),
			rule(
				{
					size: "lg",
				},
				{
					root: {
						class: [
							"px-6",
							"py-3",
						],
					},
				},
			),
		],
		defaults: {
			size: "md",
			variant: "primary",
		},
	},
);

// Create a themed cls instance for context testing
const ThemedCls = cls(
	{
		tokens: {
			"primary.textColor": [
				"default",
				"hover",
			],
			"primary.bgColor": [
				"default",
				"hover",
			],
		},
		slot: [
			"root",
			"label",
		],
		variant: {
			size: [
				"sm",
				"md",
				"lg",
			],
			variant: [
				"primary",
				"secondary",
			],
		},
	},
	{
		token: {
			"primary.textColor": {
				default: [
					"text-white",
				],
				hover: [
					"text-red-100",
				],
			},
			"primary.bgColor": {
				default: [
					"bg-red-500",
				],
				hover: [
					"bg-red-600",
				],
			},
		},
		rules: ({ root }) => [
			root({
				root: {
					class: [
						"inline-flex",
						"items-center",
					],
					token: [
						"primary.bgColor.default",
						"primary.textColor.default",
					],
				},
				label: {
					class: [
						"font-medium",
					],
				},
			}),
		],
		defaults: {
			size: "md",
			variant: "primary",
		},
	},
);

// Test component using useCls
function TestButton({
	variant = "primary",
	size = "md",
	children,
}: {
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	children: React.ReactNode;
}) {
	const classes = useCls(TestCls, {
		variant: {
			variant,
			size,
		},
	});

	return (
		<button
			type="button"
			className={classes.root()}
			data-testid="button"
		>
			<span className={classes.label()}>{children}</span>
		</button>
	);
}

// Test component with context
function TestButtonWithContext({
	variant = "primary",
	size = "md",
	children,
}: {
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	children: React.ReactNode;
}) {
	const classes = useCls(TestCls, {
		variant: {
			variant,
			size,
		},
	});

	return (
		<button
			type="button"
			className={classes.root()}
			data-testid="context-button"
		>
			<span className={classes.label()}>{children}</span>
		</button>
	);
}

// Test component with internal config override
function TestButtonWithInternalConfig({
	variant = "primary",
	size = "md",
	children,
}: {
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	children: React.ReactNode;
}) {
	const classes = useCls(
		TestCls,
		{
			variant: {
				variant,
				size,
			},
		}, // user config
		{
			token: {
				"primary.bgColor": {
					default: [
						"bg-orange-500",
					],
				},
			},
		}, // internal config
	);

	return (
		<button
			type="button"
			className={classes.root()}
			data-testid="internal-button"
		>
			<span className={classes.label()}>{children}</span>
		</button>
	);
}

describe("React Components with useCls", () => {
	it("should render button with default classes", () => {
		render(<TestButton>Click me</TestButton>);

		const button = screen.getByTestId("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(
			"inline-flex",
			"items-center",
			"bg-blue-500",
			"text-white",
		);

		const label = button.querySelector("span");
		expect(label).toHaveClass("font-medium");
	});

	it("should render button with custom variant", () => {
		render(
			<TestButton
				variant="secondary"
				size="lg"
			>
				Large Button
			</TestButton>,
		);

		const button = screen.getByTestId("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(
			"inline-flex",
			"items-center",
			"bg-blue-500",
			"text-white",
			"px-6",
			"py-3",
		);
	});

	it("should apply context tokens", () => {
		render(
			<ClsProvider value={ThemedCls}>
				<TestButtonWithContext>Context Button</TestButtonWithContext>
			</ClsProvider>,
		);

		const button = screen.getByTestId("context-button");
		expect(button).toBeInTheDocument();
		// Should use themed colors from context
		expect(button).toHaveClass(
			"inline-flex",
			"items-center",
			"bg-red-500",
			"text-white",
		);
	});

	it("should override context tokens with internal config", () => {
		render(
			<ClsProvider value={ThemedCls}>
				<TestButtonWithInternalConfig>
					Internal Override Button
				</TestButtonWithInternalConfig>
			</ClsProvider>,
		);

		const button = screen.getByTestId("internal-button");
		expect(button).toBeInTheDocument();
		// Internal config should override context tokens
		expect(button).toHaveClass(
			"inline-flex",
			"items-center",
			"bg-orange-500",
			"text-white",
		);
	});

	it("should handle multiple components with different contexts", () => {
		render(
			<div>
				<TestButton>Default Button</TestButton>
				<ClsProvider value={ThemedCls}>
					<TestButtonWithContext>
						Context Button
					</TestButtonWithContext>
				</ClsProvider>
			</div>,
		);

		const defaultButton = screen
			.getByText("Default Button")
			.closest("button");
		const contextButton = screen
			.getByText("Context Button")
			.closest("button");

		expect(defaultButton).toHaveClass("bg-blue-500");
		expect(contextButton).toHaveClass("bg-red-500");
	});
});
