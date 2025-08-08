import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";
import { withCls } from "../../src/react";

// Create a simple cls for testing
const TestButtonCls = cls(
	{
		tokens: {
			"primary.bgColor": [
				"default",
			],
			"primary.textColor": [
				"default",
			],
		},
		slot: [
			"root",
		],
		variant: {
			variant: [
				"primary",
				"secondary",
			],
			size: [
				"sm",
				"md",
				"lg",
			],
		},
	},
	{
		token: {
			"primary.bgColor": {
				default: [
					"bg-blue-500",
				],
			},
			"primary.textColor": {
				default: [
					"text-white",
				],
			},
		},
		rules: ({ root, rule }) => [
			root({
				root: {
					class: [
						"inline-flex",
						"items-center",
						"justify-center",
						"rounded-md",
					],
					token: [
						"primary.bgColor.default",
						"primary.textColor.default",
					],
				},
			}),
			rule(
				{
					variant: "primary",
				},
				{
					root: {
						token: [
							"primary.bgColor.default",
							"primary.textColor.default",
						],
					},
				},
			),
			rule(
				{
					variant: "secondary",
				},
				{
					root: {
						class: [
							"bg-gray-200",
							"text-gray-900",
						],
					},
				},
			),
		],
		defaults: {
			variant: "primary",
			size: "md",
		},
	},
);

// Define component props
interface TestButtonProps {
	children?: React.ReactNode;
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	onClick?: () => void;
}

// Create a simple component
const TestButton: React.FC<TestButtonProps> = ({
	children,
	variant = "primary",
	size = "md",
	onClick,
}) => {
	const classes = TestButtonCls.create({
		variant: {
			variant,
			size,
		},
	});

	return (
		<button
			type="button"
			className={classes.root()}
			onClick={onClick}
			data-testid="test-button"
		>
			{children}
		</button>
	);
};

// Use withCls to attach the cls instance
const ModernTestButton = withCls(TestButton, TestButtonCls);

describe("withCls HoC", () => {
	it("should attach cls instance to component", () => {
		// The cls instance should be accessible as a property
		expect(ModernTestButton.cls).toBe(TestButtonCls);
		expect(ModernTestButton.cls).toBeDefined();
	});

	it("should render component normally", () => {
		render(<ModernTestButton>Click me</ModernTestButton>);

		const button = screen.getByTestId("test-button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(
			"inline-flex",
			"items-center",
			"justify-center",
			"rounded-md",
			"bg-blue-500",
			"text-white",
		);
	});

	it("should render with custom props", () => {
		render(
			<ModernTestButton
				variant="secondary"
				size="lg"
			>
				Large Secondary
			</ModernTestButton>,
		);

		const button = screen.getByTestId("test-button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(
			"inline-flex",
			"items-center",
			"justify-center",
			"rounded-md",
			"bg-gray-200",
			"text-gray-900",
		);
	});

	it("should allow accessing cls methods", () => {
		// Users can now access the cls instance and its methods
		const classes = ModernTestButton.cls.create({
			variant: {
				variant: "secondary",
				size: "sm",
			},
		});

		expect(classes.root()).toContain("bg-gray-200");
		expect(classes.root()).toContain("text-gray-900");
	});

	it("should maintain component type safety", () => {
		// TypeScript should still provide proper type checking
		const handleClick = () => console.log("clicked");

		render(
			<ModernTestButton
				variant="primary"
				size="md"
				onClick={handleClick}
			>
				Type Safe Button
			</ModernTestButton>,
		);

		const button = screen.getByTestId("test-button");
		expect(button).toBeInTheDocument();
	});

	it("should work with cls.create directly", () => {
		// Demonstrate that users can use the attached cls instance
		const classes = ModernTestButton.cls.create({
			variant: {
				variant: "primary",
			},
		});

		expect(classes.root()).toContain("bg-blue-500");
		expect(classes.root()).toContain("text-white");
	});

	it("should provide phantom properties for type information", () => {
		// These are phantom properties that exist only for type information
		// They return proxyOf() at runtime but provide TypeScript intellisense

		// These should be proxyOf() at runtime (phantom properties)
		expect(ModernTestButton["~slots"]).toBeDefined();
		expect(ModernTestButton["~contract"]).toBeDefined();
		expect(ModernTestButton["~definition"]).toBeDefined();

		// The cls instance itself is available and fully typed
		expect(ModernTestButton.cls).toBe(TestButtonCls);
		expect(ModernTestButton.cls.contract).toBeDefined();
		expect(ModernTestButton.cls.definition).toBeDefined();
	});

	it("should provide type-safe slot access through phantom properties", () => {
		// This test demonstrates the type information available
		// The actual runtime values are proxyOf(), but TypeScript knows the types

		// TypeScript should know that ~slots has a 'root' property
		const slots = ModernTestButton["~slots"]["root"];
		// slots.root should be typed as ClsSlotFn<TestButtonCls["contract"]>

		// TypeScript should know the contract structure
		const contract = ModernTestButton["~contract"];
		// contract should be typed as TestButtonCls["contract"]

		// TypeScript should know the definition structure
		const definition = ModernTestButton["~definition"];
		// definition should be typed as Definition<TestButtonCls["contract"]>

		// These are all proxyOf() at runtime but provide type information
		expect(slots).toBeDefined();
		expect(contract).toBeDefined();
		expect(definition).toBeDefined();
	});
});
