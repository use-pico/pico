import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import { cls } from "../../src/cls";
import { ClsProvider, useCls } from "../../src/react";
import { ModernButton } from "./ModernButton";
import { ModernButtonCls } from "./ModernButtonCls";

// Create a component using direct cls.create() (similar to Action.tsx)
const DirectButtonCls = cls(
	{
		tokens: {
			"primary.bgColor": [
				"default",
				"hover",
			],
			"primary.textColor": [
				"default",
				"hover",
			],
		},
		slot: [
			"base",
			"action",
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
			disabled: [
				"bool",
			],
		},
	},
	{
		token: {
			"primary.bgColor": {
				default: [
					"bg-green-500",
				],
				hover: [
					"bg-green-600",
				],
			},
			"primary.textColor": {
				default: [
					"text-white",
				],
				hover: [
					"text-white",
				],
			},
		},
		rules: ({ root, rule }) => [
			root({
				base: {
					class: [
						"w-fit",
						"h-fit",
					],
				},
				action: {
					class: [
						"inline-flex",
						"items-center",
						"justify-center",
						"rounded",
						"font-medium",
						"transition-colors",
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
					action: {
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
					action: {
						class: [
							"bg-gray-200",
							"text-gray-900",
						],
					},
				},
			),
			rule(
				{
					size: "sm",
				},
				{
					action: {
						class: [
							"px-2",
							"py-1",
							"text-sm",
						],
					},
				},
			),
			rule(
				{
					size: "md",
				},
				{
					action: {
						class: [
							"px-4",
							"py-2",
							"text-base",
						],
					},
				},
			),
			rule(
				{
					size: "lg",
				},
				{
					action: {
						class: [
							"px-6",
							"py-3",
							"text-lg",
						],
					},
				},
			),
			rule(
				{
					disabled: true,
				},
				{
					action: {
						class: [
							"opacity-50",
							"cursor-not-allowed",
						],
					},
				},
			),
		],
		defaults: {
			variant: "primary",
			size: "md",
			disabled: false,
		},
	},
);

// Component using direct cls.create() (similar to Action.tsx)
export namespace DirectButton {
	export interface Props {
		variant?: "primary" | "secondary";
		size?: "sm" | "md" | "lg";
		disabled?: boolean;
		children?: React.ReactNode;
		onClick?: () => void;
	}
}

export const DirectButton: React.FC<DirectButton.Props> = ({
	children,
	variant = "primary",
	size = "md",
	disabled = false,
	onClick,
}) => {
	// Using cls.create directly (like Action.tsx)
	const classes = DirectButtonCls.create({
		variant: {
			variant,
			size,
			disabled,
		},
	});

	return (
		<div className={classes.base()}>
			<button
				type="button"
				className={classes.action()}
				onClick={disabled ? undefined : onClick}
				disabled={disabled}
			>
				{children}
			</button>
		</div>
	);
};

// Create a themed cls for context testing
const ThemedButtonCls = cls(
	{
		tokens: {
			"primary.bgColor": [
				"default",
				"hover",
			],
			"primary.textColor": [
				"default",
				"hover",
			],
		},
		slot: [
			"root",
			"label",
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
					"bg-purple-500",
				],
				hover: [
					"bg-purple-600",
				],
			},
			"primary.textColor": {
				default: [
					"text-white",
				],
				hover: [
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
						"font-medium",
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
			variant: "primary",
			size: "md",
		},
	},
);

// Component that uses context
function ContextButton({
	variant = "primary",
	size = "md",
	children,
}: {
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	children: React.ReactNode;
}) {
	const classes = useCls(ThemedButtonCls, {
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

describe("React Component APIs", () => {
	describe("Direct cls.create() API (like Action.tsx)", () => {
		it("should render direct button with default classes", () => {
			render(<DirectButton>Direct Button</DirectButton>);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass(
				"inline-flex",
				"items-center",
				"justify-center",
				"rounded",
				"font-medium",
				"transition-colors",
				"bg-green-500",
				"text-white",
				"px-4",
				"py-2",
				"text-base",
			);
		});

		it("should render direct button with custom variant", () => {
			render(
				<DirectButton
					variant="secondary"
					size="lg"
				>
					Large Direct Button
				</DirectButton>,
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass(
				"inline-flex",
				"items-center",
				"justify-center",
				"rounded",
				"font-medium",
				"transition-colors",
				"bg-gray-200",
				"text-gray-900",
				"px-6",
				"py-3",
				"text-lg",
			);
		});

		it("should render direct button with disabled state", () => {
			render(
				<DirectButton disabled>Disabled Direct Button</DirectButton>,
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toBeDisabled();
			expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
		});
	});

	describe("Modern API (useCls hook)", () => {
		it("should render modern button with default classes", () => {
			render(<ModernButton>Modern Button</ModernButton>);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass(
				"inline-flex",
				"items-center",
				"justify-center",
				"rounded-md",
				"font-medium",
				"transition-colors",
				"focus:outline-none",
				"focus:ring-2",
				"focus:ring-offset-2",
				"bg-blue-500",
				"text-white",
				"border-blue-500",
				"px-4",
				"py-2",
				"text-base",
			);
		});

		it("should render modern button with custom variant via cls prop", () => {
			render(
				<ModernButton
					cls={{
						variant: {
							variant: "danger",
							size: "lg",
						},
					}}
				>
					Large Danger Button
				</ModernButton>,
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass(
				"inline-flex",
				"items-center",
				"justify-center",
				"rounded-md",
				"font-medium",
				"transition-colors",
				"focus:outline-none",
				"focus:ring-2",
				"focus:ring-offset-2",
				"bg-red-500",
				"text-white",
				"border-red-500",
				"px-6",
				"py-3",
				"text-lg",
			);
		});

		it("should render modern button with disabled state", () => {
			render(
				<ModernButton disabled>Disabled Modern Button</ModernButton>,
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toBeDisabled();
			// Should have base styles
			expect(button).toHaveClass(
				"inline-flex",
				"items-center",
				"justify-center",
				"rounded-md",
				"font-medium",
				"transition-colors",
				"focus:outline-none",
				"focus:ring-2",
				"focus:ring-offset-2",
				"px-4",
				"py-2",
				"text-base",
			);
			// Should have disabled-specific styles
			expect(button).toHaveClass(
				"cursor-not-allowed",
				"opacity-50",
				"bg-gray-300",
				"text-gray-500",
				"border-gray-300",
			);
		});

		it("should render modern button with loading state", () => {
			render(<ModernButton loading>Loading Modern Button</ModernButton>);

			const button = screen.getByRole("button");
			const spinner = screen.getByText("⏳");

			expect(button).toBeInTheDocument();
			expect(button).toBeDisabled();
			// Should have base styles
			expect(button).toHaveClass(
				"inline-flex",
				"items-center",
				"justify-center",
				"rounded-md",
				"font-medium",
				"transition-colors",
				"focus:outline-none",
				"focus:ring-2",
				"focus:ring-offset-2",
				"bg-blue-500",
				"text-white",
				"border-blue-500",
				"px-4",
				"py-2",
				"text-base",
			);
			// Should have loading-specific styles
			expect(button).toHaveClass("cursor-wait");
			expect(spinner).toBeInTheDocument();
			expect(spinner).toHaveClass("animate-spin", "mr-2");
		});

		it("should render modern button with secondary variant via cls prop", () => {
			render(
				<ModernButton
					cls={{
						variant: {
							variant: "secondary",
						},
					}}
				>
					Secondary Button
				</ModernButton>,
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			// Should have base styles
			expect(button).toHaveClass(
				"inline-flex",
				"items-center",
				"justify-center",
				"rounded-md",
				"font-medium",
				"transition-colors",
				"focus:outline-none",
				"focus:ring-2",
				"focus:ring-offset-2",
				"px-4",
				"py-2",
				"text-base",
			);
			// Should have secondary variant styles
			expect(button).toHaveClass(
				"bg-gray-200",
				"text-gray-900",
				"border-gray-200",
			);
		});
	});

	describe("Context Integration", () => {
		it("should apply context tokens to modern components", () => {
			render(
				<ClsProvider value={ThemedButtonCls}>
					<ContextButton>Context Button</ContextButton>
				</ClsProvider>,
			);

			const button = screen.getByTestId("context-button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass(
				"inline-flex",
				"items-center",
				"justify-center",
				"rounded-md",
				"font-medium",
				"bg-purple-500",
				"text-white",
			);
		});

		it("should override context tokens with internal config", () => {
			render(
				<ClsProvider value={ThemedButtonCls}>
					<ModernButton
						cls={{
							slot: {
								root: {
									class: [
										"bg-orange-500",
									],
								},
							},
						}}
					>
						Override Button
					</ModernButton>
				</ClsProvider>,
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			// Should have the override class
			expect(button).toHaveClass("bg-orange-500");
		});
	});

	describe("Component Props Integration", () => {
		it("should handle component props correctly", () => {
			const handleClick = vi.fn();

			render(
				<ModernButton
					cls={{
						variant: {
							variant: "danger",
							size: "sm",
						},
					}}
					disabled={false}
					loading={false}
					onClick={handleClick}
					data-testid="props-button"
				>
					Props Test
				</ModernButton>,
			);

			const button = screen.getByTestId("props-button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass("bg-red-500", "px-3", "py-1", "text-sm");
			expect(button).not.toBeDisabled();

			button.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("should handle disabled and loading states correctly", () => {
			const handleClick = vi.fn();

			render(
				<ModernButton
					disabled={true}
					loading={true}
					onClick={handleClick}
				>
					Disabled Loading
				</ModernButton>,
			);

			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
			expect(button).toHaveClass("opacity-50");
			expect(button).toHaveClass("cursor-wait");

			button.click();
			expect(handleClick).not.toHaveBeenCalled();
		});

		it("should have cls instance attached via withCls", () => {
			// ModernButton should now have the cls instance attached
			expect(ModernButton.cls).toBeDefined();
			expect(ModernButton.cls).toBe(ModernButtonCls);

			// Users can access the cls instance directly
			const classes = ModernButton.cls.create(() => ({
				variant: {
					variant: "danger",
					size: "lg",
				},
			}));

			expect(classes.root()).toContain("bg-red-500");
			expect(classes.root()).toContain("px-6");
			expect(classes.root()).toContain("py-3");
		});
	});
});
